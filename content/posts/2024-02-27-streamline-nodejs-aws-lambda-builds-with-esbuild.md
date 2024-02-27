---
title: Streamline Your Node.js Lambda Builds with esbuild
date: 2024-02-27
tags:
  - javascript
  - typescript
  - lambda
  - esbuild
---
## Streamline Your Node.js Lambda Builds with esbuild

Building Node.js functions for AWS Lambda can be a breeze with the powerful esbuild bundler. In this post, I'll show how to leverage esbuild's speed and efficiency to your node.js functions for AWS lambda

### Why esbuild for Lambda Functions?

I've used `webpack` but it was slow and inefficient, especially when dealing with multiple Lambda functions. `esbuild` shines in this domain due to its:

- **Lightning speed:** Built with Go, `esbuild` boasts exceptionally fast build times, significantly reducing development iteration cycles.
- **Reduced bundle size:** By using tree-shaking, esbuild removes unused code, leading to smaller deployment packages, which translates to faster Lambda execution and potentially lower costs.
- **Customization:** You have fine-grained control over your build process with various configuration options, allowing you to tailor it to your specific needs.

### Building with esbuild

The provided example showcases a basic script utilizing esbuild for building multiple Lambda functions:

```typescript
const esbuild = require('esbuild')
const path = require('path')
const rimraf = require('rimraf')

// Clean the output directory
rimraf.sync('dist')

// Determine development mode
const isDev = process.argv.includes('--dev')

// Define entry points for your functions
const entryPoints = [
  // Replace with your function paths
  '/create-company/index.ts',
  // ... other function paths
]

// Build each function individually
entryPoints.forEach((entryPoint) => {
  esbuild.build({
    entryPoints: [path.join('src', entryPoint)],
    bundle: true, // Create a single file for each function
    outdir: path.join('dist', path.dirname(entryPoint)), // Maintain directory structure
    platform: 'node', // Target Node.js environment
    target: 'node20', // Specify your Lambda runtime (adjust as needed)
    minify: !isDev, // Enable minification for production builds
    sourcemap: isDev,
  }).catch(() => process.exit(1))
})
```

### Explanation

1. **Dependencies:** Install `esbuild`, `path`, and `rimraf` using `npm install --save-dev esbuild path rimraf`.
2. **Cleaning Output:** The code starts by clearing the existing `dist` folder using `rimraf`.
3. **Development Mode:** It checks for the `--dev` flag in the command line arguments to determine if it's a development build.
4. **Entry Points:** An array named `entryPoints` lists the paths to your Lambda function files (replace with your actual paths).
5. **Individual Builds:** The script iterates through each entry point and uses `esbuild.build` to build them individually.
6. **Configuration:** Each build uses the following configuration options:
    - `entryPoints`: Defines the entry point for the build.
    - `bundle`: Creates a single JavaScript file for each function.
    - `outdir`: Specifies the output directory, maintaining the original directory structure.
    - `platform`: Sets the target platform as "node".
    - `target`: Specifies the Node.js version your Lambda functions target (adjust as needed).
    - `minify`: Enables minification to optimize the code size for production builds (disabled in development mode).

### Customization and Integration

- **Entry Points:** Update the `entryPoints` array to match your specific function file paths.
- **esbuild Options:** Explore the extensive documentation of esbuild options for further customization, such as:
    
    - **Source maps:** Enable source maps for debugging.
    - **External dependencies:** Specify external libraries to exclude from bundling.
    - **Plugins:** Integrate plugins for additional functionalities.
    
- **Deployment Tools:** Consider integrating this script with your deployment tools like AWS SAM or Serverless Framework to automate the build process during deployments.

By incorporating esbuild into your workflow, you can significantly enhance your development experience for AWS Lambda functions. Its exceptional speed, efficiency, and control over the build process make it a valuable asset for any Node.js developer building serverless applications.