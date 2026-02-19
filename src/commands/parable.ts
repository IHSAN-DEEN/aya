import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { printCommandHeader } from '../utils/printer';

interface Parable {
  name: string;
  surah: string;
  ayah: string;
  title: string;
  animate: () => Promise<void>;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const spiderParable: Parable = {
  name: 'spider',
  surah: 'Al-Ankabut',
  ayah: '29:41',
  title: 'The House of the Spider',
  animate: async () => {
    console.clear();
    const frames = [
      `
      / \\
     /   \\
    /     \\
   /_______\\
  |         |
  |         |
      `,
      `
      / \\
     /   \\
    /  🕷️  \\
   /_______\\
  |         |
  |         |
      `,
      `
      / \\
     / 🪰 \\
    /  🕷️  \\
   /_______\\
  |         |
  |         |
      `
    ];

    // Build the web
    for (const frame of frames) {
      console.clear();
      console.log(chalk.gray(frame));
      await sleep(800);
    }

    await sleep(500);
    console.log(chalk.white.italic('\n"The example of those who take allies other than Allah..."'));
    await sleep(2500);
    console.log(chalk.white.italic('"...is that of the spider who builds a house."'));
    await sleep(2500);

    // Crumble animation
    const crumblingFrames = [
      `
      / \\
     / 🪰 \\
    /  🕷️  \\
   /_______\\
  |         |
  |         |
      `,
      `
      / \\
     /    \\
    /  🕷️   \\
   /       \\
  |         |
  |         |
      `,
      `
      / 
     /    
       🕷️   
   /       
            |
  |         
      `,
      `
      
     
       🕷️   
   
            
  
      `,
      `
      
     
          
   
            
  
      `
    ];

    for (const frame of crumblingFrames) {
      console.clear();
      console.log(chalk.gray(frame));
      await sleep(400); // Slower crumble to be visible
    }

    console.clear();
    console.log(chalk.red.bold('\nThe web is gone.'));
    await sleep(1000);
    console.log(chalk.white.bold('\n"And indeed, the weakest of houses is the house of the spider." (29:41)'));
    console.log(chalk.gray('\nLesson: Reliance on anything other than Allah is like leaning on a spider web.'));
  }
};

const rainParable: Parable = {
  name: 'rain',
  surah: 'Al-Baqarah',
  ayah: '2:265',
  title: 'The Heavy Rain',
  animate: async () => {
    console.clear();
    const clouds = `
      ☁️   ☁️    ☁️
    `;
    console.log(clouds);
    await sleep(1000);

    const rainFrames = [
      `
      ☁️   ☁️    ☁️
      💧   💧    💧
      `,
      `
      ☁️   ☁️    ☁️
      
      💧   💧    💧
      `,
      `
      ☁️   ☁️    ☁️
      
      
      💧   💧    💧
      `,
      `
      ☁️   ☁️    ☁️
      
      
      🌱   🌱    🌱
      ========
      `
    ];

    for (let i = 0; i < 4; i++) { // Loop rain a few times
        for (const frame of rainFrames.slice(0, 3)) {
            console.clear();
            console.log(chalk.blue(frame));
            await sleep(200);
        }
    }
    
    // Final growth
    console.clear();
    console.log(chalk.green(rainFrames[3]));
    
    await sleep(1000);
    console.log(chalk.green.bold('\nLife springs forth.'));
    console.log(chalk.white.italic('\n"And Allah sees what you do. Sincerity makes even small deeds grow like a garden after rain."'));
  }
};

const lightParable: Parable = {
  name: 'light',
  surah: 'An-Nur',
  ayah: '24:35',
  title: 'Light upon Light',
  animate: async () => {
    const lampFrames = [
      `
      ✨
     🕯️
    💡
   🌟
    `,
    `
     ✨
    🕯️
     💡
    🌟
    `,
    `
      ✨
     🕯️
    💡
   🌟
    `,
    `
    ✨
     🕯️
      💡
       🌟
    `
    ];

    console.log(chalk.white.italic('\n"Allah is the Light of the heavens and the earth."'));
    await sleep(1500);

    for (let i = 0; i < 10; i++) {
        console.clear();
        const frame = lampFrames[i % lampFrames.length];
        // Randomly colorize for flickering effect
        const color = Math.random() > 0.5 ? chalk.yellow : chalk.yellowBright;
        console.log(color.bold(frame));
        await sleep(200);
    }
    
    console.log(chalk.white.italic('\n"Light upon light. Allah guides to His light whom He wills."'));
  }
};

const ropeParable: Parable = {
  name: 'rope',
  surah: 'Ali \'Imran',
  ayah: '3:103',
  title: 'The Rope of Allah',
  animate: async () => {
    console.clear();
    const frames = [
      `
      
      
      
      
      (   ALL   )
       \\_______/
      `,
      `
          |
          |
      
      
      (   ALL   )
       \\_______/
      `,
      `
          |
          |
          |
          |
      (   ALL   )
       \\_______/
      `,
      `
          |
          |
         /|\\
        / | \\
       /  |  \\
      ( 🤝 ALL 🤝 )
       \\_______/
      `
    ];

    for (const frame of frames) {
      console.clear();
      console.log(chalk.blue(frame));
      await sleep(800);
    }

    await sleep(500);
    console.log(chalk.yellow('\nImagine if everyone let go... 💔'));
    await sleep(2000);
    console.log(chalk.green('\nBut if we hold tight... 🤝'));
    await sleep(1000);

    console.log(chalk.white.italic('\n"And hold firmly to the rope of Allah all together and do not become divided." (3:103)'));
    console.log(chalk.gray('\nTadabbur: The "Rope" is the Quran/Covenant. Holding it *together* is our only safety from the pit of fire.'));
  }
};

const treeParable: Parable = {
    name: 'tree',
    surah: 'Ibrahim',
    ayah: '14:24',
    title: 'The Good Tree',
    animate: async () => {
        const frames = [
            `
            . (seed)
            `,
            `
            🌱
            `,
            `
            🌿
            |
            `,
            `
           🌳
           |
           |
            `,
            `
           🌳🌳
           ||
           ||
          root
            `
        ];
        
        for (const frame of frames) {
            console.clear();
            console.log(chalk.green(frame));
            await sleep(800);
        }
        console.log(chalk.white.italic('\n"A good word is like a good tree, its root is firm and its branches are in the sky."'));
    }
}


const parables: Parable[] = [spiderParable, rainParable, lightParable, ropeParable, treeParable];

export const parableCommand = new Command('parable')
  .description('Visual Quranic Metaphors (Animated)')
  .argument('[name]', 'Name of the parable (e.g., spider, rain, light)')
  .action(async (name) => {
    printCommandHeader('parable');
    let selectedParable;

    if (name) {
      selectedParable = parables.find(p => p.name.toLowerCase() === name.toLowerCase());
      if (!selectedParable) {
        console.log(chalk.red('Parable not found.'));
        return;
      }
    } else {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'parable',
          message: 'Choose a parable to visualize:',
          choices: parables.map(p => p.name)
        }
      ]);
      selectedParable = parables.find(p => p.name === answers.parable);
    }

    if (selectedParable) {
      console.clear();
      console.log(chalk.green.bold(`\n${selectedParable.title}`));
      console.log(chalk.gray(`Surah ${selectedParable.surah} (${selectedParable.ayah})`));
      await sleep(1500);
      await selectedParable.animate();
    }
  });
