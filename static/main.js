let src = `
func a() {
  return (1337);
}
func b(a:Int) -> Int {
  return (a);
}
func c(a:Int, b:Int) -> (a: Int, b: Int) {
  return (a, b);
}
func d(a: inout Int) {
  a *= 2;
}

func add(a:Int, to b:Int) -> Int {
  return (b + a);
}
print(add(a:&ccc, to:1336)); // 1337

func mul(a:Int, _ b:Int) {
  print(a * b);
}
mul(a:2, 4); // 8
`;

swift.innerHTML = src;

let ast = swiftly.parse(swiftly.tokenize(src));

console.log(ast);