'use client';

import { useState, useRef, useId } from 'react';
import { useTranslations } from 'next-intl';
import type { IEndpointItem } from '../../types/openapi-types';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { CirclePlay as PlayIcon } from 'lucide-react';
import { fetchViaProxy } from '@/shared/api/proxy-client';
import { CodeEditor } from '@/shared/ui/code-editor';
import { buildUrl } from './build-url';
import { buildHeaders } from './build-headers';
import { getFormStringValue } from './get-form-string-value';
import { formatResponseBody } from './format-response-body';
import { getParameterFieldName } from './get-parameter-field-name';
import { generateCurlCommand } from './generate-curl-command';

import styles from './try-it-out-form.module.scss';

interface IProps {
  endpoint: IEndpointItem;
  serverUrl: string;
}

interface IRequestResult {
  status: number;
  headers: Record<string, string>;
  body: string;
}

interface IRequestState {
  targetUrl: string;
  method: string;
  headers: Headers;
  body?: string;
}

export function TryItOutForm({ endpoint, serverUrl }: IProps) {
  const t = useTranslations('TryItOut');
  const textareaId = useId();

  const [result, setResult] = useState<IRequestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [curlCommand, setCurlCommand] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const parameters = endpoint.details.parameters || [];
  const requestBody = endpoint.details.requestBody;

  const contentType = requestBody?.content['application/json']
    ? 'application/json'
    : Object.keys(requestBody?.content ?? {})[0];

  const mediaType = contentType ? requestBody?.content[contentType] : undefined;

  let defaultTextareaValue = '';
  if (mediaType) {
    if (mediaType.example !== undefined) {
      defaultTextareaValue = JSON.stringify(mediaType.example, null, 2);
    } else if (mediaType.examples) {
      const firstExample = Object.values(mediaType.examples)[0] as { value?: unknown } | undefined;
      if (firstExample && firstExample.value !== undefined) {
        defaultTextareaValue = JSON.stringify(firstExample.value, null, 2);
      }
    }
  }

  const getRequestState = (form: HTMLFormElement): IRequestState => {
    const formData = new FormData(form);

    const targetUrl = buildUrl({
      serverUrl,
      path: endpoint.path,
      parameters,
      formData,
    });

    const headers = buildHeaders({
      parameters,
      formData,
      contentType,
    });

    const requestBodyValue = getFormStringValue(formData, 'requestBody').trim();
    const method = endpoint.method.toUpperCase();
    const shouldSendBody = method !== 'GET' && method !== 'HEAD' && requestBodyValue.length > 0;

    return {
      targetUrl,
      method,
      headers,
      body: shouldSendBody ? requestBodyValue : undefined,
    };
  };

  const handleSubmit = async (form: HTMLFormElement) => {
    setIsLoading(true);
    setResult(null);

    try {
      const { targetUrl, method, headers, body: requestBodyValue } = getRequestState(form);

      const response = await fetchViaProxy(targetUrl, {
        method,
        headers,
        body: requestBodyValue,
      });

      const body = await response.text();

      setResult({
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        body: formatResponseBody(body),
      });
    } catch {
      setResult({
        status: 0,
        headers: {},
        body: 'Request failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCurl = () => {
    const form = formRef.current;

    if (!form) {
      return;
    }

    if (!form.reportValidity()) {
      return;
    }

    try {
      const { targetUrl, method, headers, body } = getRequestState(form);

      const command = generateCurlCommand({
        method,
        url: targetUrl,
        headers,
        body,
      });

      setCurlCommand(command);
      setIsCopied(false);
    } catch {
      setCurlCommand('');
      setIsCopied(false);
    }
  };

  const handleCopyCurl = async () => {
    if (!curlCommand) {
      return;
    }

    try {
      await navigator.clipboard.writeText(curlCommand);
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        <PlayIcon className={styles.titleIcon} />
        <span>{t('title')}</span>
      </h3>

      <form
        ref={formRef}
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit(event.currentTarget);
        }}
      >
        {parameters.map((param) => (
          <Input
            key={`${param.in}-${param.name}`}
            name={getParameterFieldName(param)}
            className={styles.input}
            label={`${param.name} (${param.in})`}
            required={param.required}
            placeholder={t('placeholder.param', { in: param.in })}
            withErrorPlug={false}
          />
        ))}

        {mediaType && (
          <div className={styles.textareaGroup}>
            <label className={styles.label} htmlFor={textareaId}>
              {t('requestBody')}
            </label>
            <textarea
              id={textareaId}
              name="requestBody"
              className={styles.textArea}
              rows={6}
              defaultValue={defaultTextareaValue}
              placeholder={t('placeholder.json')}
            />
          </div>
        )}

        <div className={styles.actions}>
          <Button className={styles.button} variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? t('executing') : t('execute')}
          </Button>
          <Button className={styles.button} variant="secondary" type="button" onClick={handleGenerateCurl}>
            {t('generateCurl')}
          </Button>
        </div>
      </form>

      {result && (
        <div className={styles.result}>
          <div className={styles.titleBlock}>
            <h4 className={styles.resultTitle}>{t('response')}</h4>
            <div>Status: {result.status}</div>
          </div>
          <div className={styles.block}>
            <p className={styles.responseLabel}>Headers</p>
            <CodeEditor value={JSON.stringify(result.headers, null, 2)} format="json" readonly transparent hideLines />
          </div>
          <div className={styles.block}>
            <p className={styles.responseLabel}>Body</p>
            <CodeEditor value={result.body} format="json" readonly transparent hideLines />
          </div>
        </div>
      )}

      {curlCommand && (
        <div className={styles.curl}>
          <h4 className={styles.resultTitle}>{t('curlCommand')}</h4>
          <div className={styles.block}>
            <CodeEditor value={curlCommand} format="json" readonly transparent hideLines />
          </div>
          <Button type="button" variant="secondary" onClick={() => void handleCopyCurl()}>
            {isCopied ? t('copied') : t('copy')}
          </Button>
        </div>
      )}
    </div>
  );
}
