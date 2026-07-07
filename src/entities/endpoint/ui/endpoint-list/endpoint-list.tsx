import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import clsx from 'clsx';
import type { IEndpointGroup } from '../../lib/group-endpoints';
import { MethodBadge } from '../method-badge/method-badge';
import styles from './endpoint-list.module.scss';

interface IProps {
  className?: string;
  groups: IEndpointGroup[];
}

export function EndpointList({ className, groups }: IProps) {
  return (
    <div className={clsx(styles.listWrapper, className)}>
      {groups.map((group) => (
        <div key={group.tag} className={styles.group}>
          <h2 className={styles.tagTitle}>{group.tag.toUpperCase()}</h2>

          <Accordion>
            {group.endpoints.map((endpoint) => (
              <AccordionItem key={endpoint.id} value={endpoint.id}>
                <AccordionTrigger>
                  <MethodBadge type={endpoint.method} className="" />
                  <span className={styles.pathText}>{endpoint.path}</span>
                  <span className={styles.summaryText}>{endpoint.summary}</span>
                </AccordionTrigger>

                <AccordionContent>
                  <div className={styles.placeholderContent}>Endpoint Content</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
