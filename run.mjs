import { fileURLToPath, URL } from 'node:url';
import { counts, list, option, selectors, stdout, value } from '@cairul/plugin-kit/runner';

const reporter = fileURLToPath(new URL('./reporter.mjs', import.meta.url));

function summarize(output) {
  const summaries = output
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line))
    .filter((event) => event.counts);
  const final = summaries.findLast((event) => !event.file);
  if (!final) throw new Error('Node returned no execution summary.');
  const sources = summaries.filter((event) => event.file);
  const passed = sources.length
    ? sources.reduce((total, event) => total + event.counts.passed, 0)
    : final.counts.passed;
  const { failed, cancelled, skipped, todo } = final.counts;
  return counts(passed, failed + cancelled, skipped + todo);
}

export default {
  command: ['node'],
  select: selectors({ files: list, namePattern: value }),
  build({ files, namePattern }) {
    return {
      args: ['--test', '--test-reporter', reporter, ...option('--test-name-pattern', namePattern), ...(files ?? [])],
      capture: true,
      read: stdout(summarize),
    };
  },
};
