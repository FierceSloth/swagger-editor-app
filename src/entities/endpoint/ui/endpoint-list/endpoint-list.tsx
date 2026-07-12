import clsx from 'clsx';

import type { IEndpointGroup } from '../../types/openapi-types';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { EndpointParameters } from '../endpoint-parameters/endpoint-parameters';
import { MethodBadge } from '../method-badge/method-badge';
import { TryItOutForm } from '../try-it-out-form/try-it-out-form';

import styles from './endpoint-list.module.scss';
import { RequestBody } from '../request-body/request-body';
import { ResponseList } from '../response-list/response-list';

interface IProps {
  className?: string;
  groups: IEndpointGroup[];
  serverUrl: string;
}

export function EndpointList({ className, groups, serverUrl }: IProps) {
  return (
    <div className={clsx(styles.listWrapper, className)}>
      {groups.map((group) => (
        <div key={group.tag} className={styles.group}>
          <h2 className={styles.tagTitle}>{group.tag}</h2>

          <Accordion>
            {group.endpoints.map((endpoint) => (
              <AccordionItem key={endpoint.id} value={endpoint.id}>
                <AccordionTrigger>
                  <div className={styles.triggerWrapper}>
                    <MethodBadge type={endpoint.method} className="" />
                    <span className={styles.pathText}>{endpoint.path}</span>
                    <span className={styles.summaryText}>{endpoint.summary}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className={styles.content}>
                  <EndpointParameters parameters={endpoint.details.parameters} />
                  <RequestBody requestBody={endpoint.details.requestBody} />
                  <ResponseList responses={endpoint.details.responses} />
                  <TryItOutForm endpoint={endpoint} serverUrl={serverUrl} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
