/**
 * @copyright Copyright (c) 2022 Adam Josefus
 */

import { join, dirname, fromFileUrl, normalize, relative } from 'https://deno.land/std@0.138.0/path/mod.ts';
import { gray, bold } from 'https://deno.land/std@0.138.0/fmt/colors.ts';


const __dirname = dirname(fromFileUrl(import.meta.url));
const root = join(__dirname, '..');

const packagerName = 'pkg.ts';
const outputName = 'pkg.bundled.js';

const packagerFile = relative(Deno.cwd(), normalize(join(root, packagerName)));
const outputFile = relative(Deno.cwd(), normalize(join(root, outputName)));

const cmd = [
    `deno`,
    `bundle`,
    `${packagerFile}`,
`${outputFile}`,
];

console.log('\n');
console.log(bold(`Bundle to ${outputName}`));
console.log(gray(`> ${cmd.join(' ')}`));

const process = await Deno.run({
    cmd: cmd,
    stdout: 'piped',
    stderr: 'piped',
})

const { success } = await process.status();

if (success) {
    console.log(gray(`> Succeed`));
} else {
    const outputBytes = await process.stderrOutput()
    const output = (new TextDecoder()).decode(outputBytes);
    console.log(gray(`> Failed`));
    console.log(gray(`>> ${output}`));
}

console.log('\n');
