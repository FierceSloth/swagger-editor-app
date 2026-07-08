import { useTranslations } from 'next-intl';

import type { IOpenApiParameter } from '../../types/openapi-types';

import styles from './endpoint-parameters.module.scss';

interface IProps {
  parameters?: IOpenApiParameter[];
}

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
                  <span className={param.required ? styles.requiredYes : styles.requiredNo}>
                    {param.required ? t('yes') : t('no')}
                  </span>
                </td>
                <td className={styles.cellDescription}>{param.description || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
