import { testRunner } from '@cairul/pdk/runner';
import adapter from './run.mjs';
import { tap, junit, testPlugin } from '@cairul/pdk/reports';

const reports = testPlugin('node-test.passed', { tap, junit });

export default testRunner(reports, 'node-test.run', adapter);
