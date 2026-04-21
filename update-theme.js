const fs = require('fs/promises');
const path = require('path');

async function processFiles() {
  const dir = path.join(__dirname, 'components', 'landing');
  const files = await fs.readdir(dir);

  const replacements = [
    { regex: /(?<!dark:)bg-\[\#09090B\]/g, replace: 'bg-zinc-50 dark:bg-[#09090B]' },
    { regex: /(?<!dark:|via-|from-|to-|text-hover:|hover:|>)text-white/g, replace: 'text-zinc-900 dark:text-white' },
    { regex: /(?<!text-zinc-600 dark:|dark:)text-zinc-400/g, replace: 'text-zinc-600 dark:text-zinc-400' },
    { regex: /(?<!text-zinc-700 dark:|dark:)text-zinc-300/g, replace: 'text-zinc-700 dark:text-zinc-300' },
    { regex: /(?<!bg-black\/5 dark:|dark:)bg-white\/5(?!0)/g, replace: 'bg-black/5 dark:bg-white/5' },
    { regex: /(?<!bg-black\/10 dark:|dark:)bg-white\/10/g, replace: 'bg-black/10 dark:bg-white/10' },
    { regex: /(?<!bg-black\/\[0\.02\] dark:|dark:)bg-white\/\[0\.02\]/g, replace: 'bg-black/[0.02] dark:bg-white/[0.02]' },
    { regex: /(?<!bg-black\/\[0\.03\] dark:|dark:)bg-white\/\[0\.03\]/g, replace: 'bg-black/[0.03] dark:bg-white/[0.03]' },
    { regex: /(?<!bg-black\/\[0\.04\] dark:|dark:)bg-white\/\[0\.04\]/g, replace: 'bg-black/[0.04] dark:bg-white/[0.04]' },
    { regex: /(?<!bg-black\/\[0\.06\] dark:|dark:)bg-white\/\[0\.06\]/g, replace: 'bg-black/[0.06] dark:bg-white/[0.06]' },
    { regex: /(?<!border-black\/10 dark:|dark:)border-white\/10/g, replace: 'border-black/10 dark:border-white/10' },
    { regex: /(?<!border-black\/5 dark:|dark:)border-white\/5/g, replace: 'border-black/5 dark:border-white/5' },
    { regex: /(?<!border-black\/20 dark:|dark:|hover:)border-white\/20/g, replace: 'border-black/20 dark:border-white/20' },
    { regex: /(?<!border-black\/\[0\.12\] dark:|dark:)border-white\/\[0\.12\]/g, replace: 'border-black/[0.12] dark:border-white/[0.12]' },
    { regex: /(?<!border-black\/\[0\.1\] dark:|dark:)border-white\/\[0\.1\]/g, replace: 'border-black/[0.1] dark:border-white/[0.1]' },
    { regex: /(?<!from-zinc-50 dark:|dark:)from-\[\#09090B\]/g, replace: 'from-zinc-50 dark:from-[#09090B]' },
    { regex: /(?<!to-zinc-50 dark:|dark:)to-\[\#09090B\]/g, replace: 'to-zinc-50 dark:to-[#09090B]' },
    { regex: /(?<!via-zinc-50 dark:|dark:)via-\[\#09090B\]/g, replace: 'via-zinc-50 dark:via-[#09090B]' },
    { regex: /rgba\(9,9,11/g, replace: 'rgba(250,250,250,1) dark:rgba(9,9,11' }, // Specific fix for Hero radial mask
  ];

  for (const file of files) {
    if (!file.endsWith('.tsx') || file === 'Header.tsx') continue;
    
    const filePath = path.join(dir, file);
    let content = await fs.readFile(filePath, 'utf8');
    let original = content;

    for (const { regex, replace } of replacements) {
      content = content.replace(regex, replace);
    }
    
    // Custom fix for Hero's radial gradient
    if (file === 'Hero.tsx') {
      content = content.replace(/rgba\(250,250,250,1\) dark:rgba\(9,9,11/g, 'rgba(9,9,11'); // Revert
      content = content.replace(
        /bg-\[radial-gradient\(ellipse_65%_60%_at_50%_42%,rgba\(9,9,11,0\.82\)_0%,rgba\(9,9,11,0\.3\)_60%,rgba\(9,9,11,0\)_100%\)\]/g,
        'bg-[radial-gradient(ellipse_65%_60%_at_50%_42%,rgba(250,250,250,0.82)_0%,rgba(250,250,250,0.3)_60%,rgba(250,250,250,0)_100%)] dark:bg-[radial-gradient(ellipse_65%_60%_at_50%_42%,rgba(9,9,11,0.82)_0%,rgba(9,9,11,0.3)_60%,rgba(9,9,11,0)_100%)]'
      );
    }

    if (content !== original) {
      await fs.writeFile(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
}

processFiles().catch(console.error);
