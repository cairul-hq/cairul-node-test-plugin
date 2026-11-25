import { testRunner } from '@cairul/plugin-kit/runner';
import adapter from './run.mjs';
import { tap, junit, testPlugin } from '@cairul/plugin-kit/reports';

const reports = testPlugin('node-test.passed', { tap, junit });

export default testRunner(reports, 'node-test.run', adapter);
