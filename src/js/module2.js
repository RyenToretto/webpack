//定义一个求和方法
export function sum(...args) {
  return args.reduce((pre,now)=>{
    return pre+now;
  });
}