1. 手机端超过1M的图片无法识别
2. 生成密钥

   ```
   openssl genrsa -out rsa_1024_priv.pem 1024
   openssl rsa -pubout -in rsa_1024_priv.pem -out rsa_1024_pub.pem

   ```
3. rsa在浏览器端和node端用的包不一样
4. 使用api聚合请求，类似于BFF层
5. 导出怎么做：

* html2canvas + jspdf，画面一整个都是糊掉的
* puppeteer也可以，但要找支持的版本
* 个人而言，浏览器的打印功能转pdf最实用

七牛云
