import request from "@/utils/request";
const backend = 'http://119.23.243.88:8888/'
export function testpush(message){
    return request({
        url:`https://qyapi.weixin.qq.com/cgi-bin/message/send?token=XwYIMKKRSVl-0DGwbtwaJCkBpfvzpMx3SmbN2O7UouqhmhSjzBcHJ-gp0ItfkrWA9Unn1f2EewTm394pPIKj4VRkd7YzUey1gjxbf6Z4UY5py5F6OgeeSi-L8T9MipzgPPPc06PGyX-S16EHrdknkvMuI1-U3fg8tv2EM6elJ0feUVqOK7jFrBtyyJl_LjOi101HwXI_wKpowNPZc6mqSw`,
        method:'post',
        data:
            {
                "touser": "CuiYiKe",
                "toparty": "",
                "totag": "",
                "msgtype": "text",
                "agentid": 1000002,
                "text": {
                    "content": `"${message}"`
                },
                "safe": 0,
                "enable_id_trans": 0,
                "enable_duplicate_check": 0
            }
    })
}
