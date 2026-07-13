import { useTranslations } from 'next-intl';

import type { IOpenApiParameter } from '../../types/openapi-types';

import { Badge } from '@/shared/ui/badge';
import styles from './endpoint-parameters.module.scss';

interface IProps {
  parameters?: IOpenApiParameter[];
}

const EMPTY_VALUE_PLACEHOLDER = '—';

function getParameterType(param: IOpenApiParameter): string {
  return param.schema?.type ?? param.type ?? 'string';
}

export function EndpointParameters({ parameters }: IProps) {
  const t = useTranslations('EndpointParameters');

  if (!parameters || parameters.length === 0) return null;

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{t('title')}</h3>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>{t('name')}</th>
              <th className={styles.th}>{t('in')}</th>
              <th className={styles.th}>{t('type')}</th>
              <th className={styles.th}>{t('required')}</th>
              <th className={styles.th}>{t('description')}</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((param) => (
              <tr key={`${param.in}-${param.name}`} className={styles.row}>
                <td className={styles.cellName}>{param.name}</td>
                <td className={styles.cellIn}>{param.in}</td>
                <td className={styles.cellType}>{getParameterType(param)}</td>
                <td className={styles.cellRequired}>
                  <Badge className={styles.requiredBadge} color={param.required ? 'green' : 'gray'}>
                    {param.required ? t('yes') : t('no')}
                  </Badge>
                </td>
                <td className={styles.cellDescription}>{param.description || EMPTY_VALUE_PLACEHOLDER}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
