import { readFileSync, writeFileSync } from "fs";
const file = "../package.json";
const json = JSON.parse(readFileSync(file));
try {
  let name = json.name;
  let version = json.version;
  const gmt = new Date().toUTCString();
  const loc = new Date().toLocaleString();
  const ver = {
    name: name,
    version: version,
    node_version: process.version,
    build_date_gmt: gmt,
    build_date_local: loc,
  };
  console.log(ver);
  const ver_ts_line = `export const mathil_info = ${JSON.stringify(ver)}`;
  const warning_ts_line = `// this file is generated, don't edit manually`;
  const version_ts_file = `${warning_ts_line}\n${ver_ts_line}\n`;
  writeFileSync("./_version.ts", version_ts_file, { flag: "w+" });
} catch (err) {
  console.log(err);
}
