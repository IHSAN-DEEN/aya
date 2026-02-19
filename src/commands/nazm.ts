import { Command } from 'commander';
import chalk from 'chalk';
import { nazmData } from '../data/nak';
import { printCommandHeader } from '../utils/printer';

export const nazmCommand = new Command('nazm')
  .description('The Symmetry Visualizer (Ring Structure)')
  .argument('[surah]', 'The Surah to visualize (e.g. fatiha)')
  .action((surah) => {
    printCommandHeader('nazm');
    const data = nazmData.find(d => d.surah.toLowerCase().includes(surah?.toLowerCase() || 'fatiha'));

    if (!data) {
      console.log(chalk.red('Symmetry structure not found for that Surah.'));
      console.log(chalk.gray('Currently available: Al-Fatiha'));
      return;
    }

    console.clear();
    console.log(chalk.green.bold(`\n  Aya Nazm: ${data.surah}`));
    console.log(chalk.gray(data.description));
    console.log(chalk.gray('----------------------------------------\n'));

    const lines = data.ayahs;
    const connections = data.connections;
    const center = data.center;

    // 1. Sort connections by size (distance) -> smallest first (innermost)
    const sortedConns = [...connections].sort((a, b) => {
      const distA = Math.abs(a[1] - a[0]);
      const distB = Math.abs(b[1] - b[0]);
      return distA - distB;
    });

    const maxLineLen = 50; // Truncate text for display
    const padding = 2;

    lines.forEach((line, index) => {
      const ayahNum = index + 1;
      
      // Prepare text part
      let textPart = `${ayahNum}. ${line}`;
      if (textPart.length > maxLineLen) {
        textPart = textPart.substring(0, maxLineLen - 3) + '...';
      }
      textPart = textPart.padEnd(maxLineLen + padding);

      // Prepare tracks
      const tracks: string[] = [];
      let activeConnIdx = -1;

      for (let i = 0; i < sortedConns.length; i++) {
        const [start, end] = sortedConns[i];
        const min = Math.min(start, end);
        const max = Math.max(start, end);

        if (ayahNum === min) {
          tracks[i] = '┐';
          activeConnIdx = i;
        } else if (ayahNum === max) {
          tracks[i] = '┘';
          activeConnIdx = i;
        } else if (ayahNum > min && ayahNum < max) {
          tracks[i] = '│';
        } else {
          tracks[i] = ' ';
        }
      }

      // Build the visual string
      let visual = '';
      for (let i = 0; i < sortedConns.length; i++) {
        const char = tracks[i];
        const isTarget = i === activeConnIdx;
        const isInner = i < activeConnIdx;

        // If this track is the target (start/end), we connect to it
        if (isTarget) {
          visual += chalk.cyan('──' + char);
        } 
        // If this track is inner to the target, we draw a line through it
        else if (isInner && activeConnIdx !== -1) {
           // Verify we are not overwriting a vertical line (should not happen in proper nesting)
           if (char === '│') visual += chalk.cyan('──│'); // Crossing?
           else visual += chalk.cyan('───');
        }
        // If this track is outer or unrelated
        else {
           if (char === '│') visual += chalk.cyan('  │');
           else visual += '   ';
        }
      }

      // Add center marker if applicable
      if (center && ayahNum === center) {
        visual += chalk.yellow('  <<  The Heart');
      }

      console.log(textPart + visual);
    });
    console.log('');
  });
