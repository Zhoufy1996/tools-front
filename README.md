1. 手机端超过1M的图片无法识别
2. 生成密钥
   ```
   openssl genrsa -out rsa_1024_priv.pem 1024
   openssl rsa -pubout -in rsa_1024_priv.pem -out rsa_1024_pub.pem

   ```
