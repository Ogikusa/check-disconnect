export default function select<T>(array: Array<T>): Promise<T> {
  const { columns } = Deno.consoleSize();
  const horizonSize = 50;
  const size = columns < horizonSize ? columns : horizonSize;
  return new Promise<T>((resolve) => {
    console.log("-".repeat(size));
    array.forEach((v, index) => console.log(`${index + 1}: ${v}`));
    console.log("-".repeat(size));
    while (true) {
      const inputStr = prompt(`Select network [1~${array.length}]: `);
      if (!inputStr) {
        console.log("Please enter an integer value");
        continue;
      }
      let inputNumber = -1;
      try {
        inputNumber = Number.parseFloat(inputStr);
      } catch {
        console.log("Please enter an integer value");
        continue;
      }

      if (!Number.isInteger(inputNumber)) {
        console.log("Please enter an integer value");
        continue;
      }

      if (!(1 <= inputNumber && inputNumber <= array.length)) {
        console.log(`Please enter an integer from 1 to ${array.length}`);
        continue;
      }

      resolve(array[inputNumber - 1]);
      break;
    }
  });
}
