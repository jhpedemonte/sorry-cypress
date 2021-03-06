import React, { useState } from 'react';
import { useCss, Switch, HFlow } from 'bold-ui';
import { SpecSummary } from '../spec/summary';
import { getSpecState } from '../../lib/spec';
import { Run } from '../../generated/graphql';

type RunDetailsProps = {
  run: Run;
};

export function RunDetails({ run }: RunDetailsProps): React.ReactNode {
  const { css } = useCss();
  const { specs } = run;

  const [isPassedHidden, setHidePassedSpecs] = useState(false);

  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  return (
    <div>
      <HFlow justifyContent="space-between">
        <strong>Spec files</strong>
        <Switch
          label="Hide successful specs"
          onChange={() => setHidePassedSpecs(!isPassedHidden)}
        />
      </HFlow>
      <ul>
        {specs
          .filter((spec) => !!spec)
          .filter((spec) =>
            isPassedHidden ? getSpecState(spec!) !== 'passed' : true
          )
          .map((spec) => (
            <li
              key={spec!.instanceId}
              className={css`
                 {
                  padding: 12px 0;
                }
              `}
            >
              <SpecSummary spec={spec} />
            </li>
          ))}
      </ul>
    </div>
  );
}
