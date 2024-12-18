// Node.js Benchmark for String to Uint8Array Conversion Methods
const { performance } = require('perf_hooks');

// Function to run performance benchmark
function runBenchmark(name, testFn, iterations = 1000000) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        testFn();
    }
    const end = performance.now();
    console.log(`${name} - Total time: ${(end - start).toFixed(2)}ms`);
    console.log(`Average time per iteration: ${((end - start) / iterations).toFixed(6)}ms`);
}

// Test string with various characters
const testStr = "Hello, World! 👋 こんにちは 🌍";

// Method 1: Uint8Array.from with charCodeAt
function method1() {
    return Uint8Array.from(testStr, c => c.charCodeAt(0));
}

// Method 2: TextEncoder
function method2() {
    return new TextEncoder().encode(testStr);
}

function method3() {
    const buf = new ArrayBuffer(testStr.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < testStr.length; i++) {
        view[i] = testStr.charCodeAt(i);
    }
    return view;
}

// Run benchmarks
function runStringToUint8ArrayBenchmarks() {
    console.log("Benchmarking String to Uint8Array Conversion Methods");
    console.log("Test String:", testStr);
    console.log("---");

    // Warmup runs
    method1();
    method2();
    method3();

    // Actual benchmark runs
    runBenchmark("Uint8Array.from(charCodeAt)", method1);
    runBenchmark("TextEncoder().encode()", method2);
    runBenchmark("ArrayBuffer and loop", method3);

    // Verify results are equivalent
    const result1 = method1();
    const result2 = method2();
    const result3 = method3();

    console.log("\nResult Verification:");
    console.log("Method 1 length:", result1.length);
    console.log("Method 2 length:", result2.length);
    console.log("Method 3 length:", result3.length);

    // console.log("Results match:", result1.every((val, idx) => val === result2[idx]));
}

// Run the benchmarks
runStringToUint8ArrayBenchmarks();