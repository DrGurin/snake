import { getRandomInt } from './helpers';

console.log(getRandomInt);
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <h1>${getRandomInt(0, 10)}</h1>
`;
