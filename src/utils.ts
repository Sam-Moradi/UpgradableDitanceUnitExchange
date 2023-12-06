// eslint-disable-next-line import/no-anonymous-default-export
export default function (num: number) {
  if (Math.floor(num.valueOf()) === num.valueOf()) return 0;
  return num.toString().split(".")[1].length || 0;
}
