export default async function* reporter(events) {
  for await (const { type, data } of events) {
    if (type === 'test:summary') yield JSON.stringify({ file: data.file, counts: data.counts }) + '\n';
    if (type === 'test:fail') yield JSON.stringify({ failure: data.name }) + '\n';
  }
}
