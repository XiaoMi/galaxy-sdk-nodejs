Galaxy Node.js SDK User Guide
========================
1. Install galaxy-sdk-nodejs locally
```
npm install . -g
```
2. add /usr/local/lib/node_modules to NODE_PATH
```
export NODE_PATH=$NODE_PATH:/usr/local/lib/node_modules
```
3. Run examples (you need to change the AppKey/AppSecret/endpoint in the example code)
```
node examples/basic.js (SDS)
node examples/emq-example.js (EMQ)
```
