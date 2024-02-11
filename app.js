const form = document.getElementById("form");
const input = document.getElementById("config");
const container = document.getElementById("container");
const message = document.getElementById("message");
const output = document.getElementById("output");
const button = document.getElementById("copy-btn");

let newConfigV2ray;

input.addEventListener("keyup", (e) => {
  if (e.target.value === "") {
    container.style.display = "none";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = input.value;
  if (inputValue === "") {
    alert("لطفا کانفیگتون رو وارد کنید.");
    return;
  }

  const uid = inputValue.split("@")[0].split("vless://")[1];
  // const domainAndConfig = inputValue.split("@")[1].split("#")[0];
  // const configName = inputValue.split("@")[1].split("#")[1];

  message.textContent = "متن سرور را کپی و به برنامه ی خود اضافه کنید";
  output.textContent = `{
    "dns": {
      "hosts": {
        "domain:googleapis.cn": "googleapis.com"
      },
      "servers": [
        "1.1.1.1"
      ]
    },
    "inbounds": [
      {
        "listen": "127.0.0.1",
        "port": 10808,
        "protocol": "socks",
        "settings": {
          "auth": "noauth",
          "udp": true,
          "userLevel": 8
        },
        "sniffing": {
          "destOverride": [
            "http",
            "tls"
          ],
          "enabled": true
        },
        "tag": "socks"
      },
      {
        "listen": "127.0.0.1",
        "port": 10809,
        "protocol": "http",
        "settings": {
          "userLevel": 8
        },
        "tag": "http"
      }
    ],
    "log": {
      "loglevel": "warning"
    },
    "outbounds": [
      {
        "mux": {
          "concurrency": 8,
          "enabled": true,
          "xudpConcurrency": 0,
          "xudpProxyUDP443": "reject"
        },
        "protocol": "vless",
        "settings": {
          "vnext": [
            {
              "address": "PaY.ChaRjE.OnLiNe",
              "port": 2096,
              "users": [
                {
                  "encryption": "none",
                  "flow": "",
                  "id": "${uid}",
                  "level": 8,
                  "security": "auto"
                }
              ]
            }
          ]
        },
        "streamSettings": {
          "network": "ws",
          "security": "tls",
          "tlsSettings": {
            "allowInsecure": true,
            "fingerprint": "chrome",
            "publicKey": "",
            "serverName": "cDN.HPVIp.ONLiNE",
            "shortId": "",
            "show": false,
            "spiderX": ""
          },
          "wsSettings": {
            "headers": {
              "Host": "cDN.HPVIp.ONLiNE"
            },
            "path": "/"
          },
          "sockopt": {
            "dialerProxy": "fragment",
            "tcpKeepAliveIdle": 100,
            "tcpNoDelay": true
          }
        },
        "tag": "proxy"
      },
      {
        "tag": "fragment",
        "protocol": "freedom",
        "settings": {
          "domainStrategy": "AsIs",
          "fragment": {
            "packets": "tlshello",
            "length": "100-200",
            "interval": "10-20"
          }
        },
        "streamSettings": {
          "sockopt": {
            "tcpKeepAliveIdle": 100,
            "tcpNoDelay": true
          }
        }
      },
      {
        "protocol": "freedom",
        "settings": {},
        "tag": "direct"
      },
      {
        "protocol": "blackhole",
        "settings": {
          "response": {
            "type": "http"
          }
        },
        "tag": "block"
      }
    ],
    "policy": {
      "levels": {
        "8": {
          "connIdle": 300,
          "downlinkOnly": 1,
          "handshake": 4,
          "uplinkOnly": 1
        }
      },
      "system": {
        "statsOutboundUplink": true,
        "statsOutboundDownlink": true
      }
    },
    "routing": {
      "domainStrategy": "AsIs",
      "rules": [
        {
          "ip": [
            "1.1.1.1"
          ],
          "outboundTag": "proxy",
          "port": "53",
          "type": "field"
        }
      ]
    },
    "stats": {}
  }`;
  container.style.display = "block";
});

// button.addEventListener("click", function (e) {
//   if (newConfigV2ray === undefined) {
//     alert("لطفا کانفیگتون رو وارد کنید.");
//     return;
//   }
//   e.stopPropagation();

//   if (navigator.clipboard) {
//     navigator.clipboard.writeText(newConfigV2ray);
//     alert("سرور کپی شد");
//     return; //codes below wont be executed
//   }

//   output.focus();
//   output.select();

//   document.execCommand("copy");
// });
