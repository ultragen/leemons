import React, { useMemo } from 'react';
import loadable from '@loadable/component';
// import useTask from './useTask';
// import useCorrection from '../../../Grade/hooks/useCorrection';

const DeliveryStep = loadable(() => import('../Steps/DeliveryStep'));
const DevelopmentStep = loadable(() => import('../Steps/StatementAndDevelopmentStep'));
const SummaryStep = loadable(() => import('../Steps/SummaryStep'));
const CorrectionStep = loadable(() => import('../Steps/CorrectionStep'));

export default function useSteps(assignation) {
  const instance = assignation?.instance;
  const assignable = instance?.assignable;

  const steps = useMemo(() => {
    if (!instance) {
      return [];
    }
    const stepsObj = {
      summary: {
        label: 'Summary',
        component: <SummaryStep assignation={assignation} />,
        sidebar: true,
        timestamps: 'open',
      },
      statement: () => {
        const shouldShowDevelopment = assignable?.development !== null;

        if (!shouldShowDevelopment) {
          return null;
        }
        return {
          label: 'Development',
          component: <DevelopmentStep assignation={assignation} />,
          sidebar: false,
        };
      },
      submission: () => {
        const { submission } = assignable;
        const onNext = { current: null };
        const onPrev = { current: null };

        if (!submission) {
          return null;
        }
        // TODO: Check if submission is filed
        return {
          label: 'Submission',
          component: <DeliveryStep assignation={assignation} onNext={onNext} onPrev={onPrev} />,
          sidebar: true,
          timestamps: 'start',
          onNext,
          onPrev,
          // status: 'OK',
          // badge: 'Submitted',
        };
      },
    };

    const stepsToShow = ['summary', 'statement', 'submission'];

    const finalSteps = stepsToShow
      .map((step) => {
        if (typeof stepsObj[step] === 'function') {
          return stepsObj[step]();
        }

        return stepsObj[step];
      })
      .filter((step) => step);

    return finalSteps;
  }, [assignation]);

  return steps;
}