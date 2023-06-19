export default {
  name: '现在采样',
  icon: '',
  mainFormName: '采样单',
  description: '采样流程',
  flowMsgType: 'w-pick',
  workspaceheader: 'default',
  workNodes: [
    {
      nodeKey: 'scenePick',
      nodeName: '现场采样',
      forms: ['scenePick'],
      to: ['pickAudit'],
      coopAttrs: {
        master: ['pick']
      },
      defaultMaster: [],
      buttons: {
        //重写默认按钮
        sendCoop: {
          hide: true
        },
        backCoop: {
          hide: true
        },
        approval: {
          text: '提交', //按钮名称
          hide: false,
          hideRemark: true
        }
      }
    },
    {
      nodeKey: 'pickAudit',
      nodeName: '采样审核',
      forms: [], //"pickAudit"
      coopAttrs: {
        master: ['lims-pickAudit']
      },
      remark: {
        // 默认审批开启
        sendKey: 'approve', // 发送下一步的审批推荐key,读取配置Cfg,默认配置内就有一个general
        backKey: 'reject' // 回退的审批推荐key,读取配置Cfg,默认配置内就有一个general
      },
      defaultMaster: [],
      workSpace: 'form',
      buttons: {
        //重写默认按钮
        approval: {
          hide: true //是否隐藏按钮
        },
        backCoop: {
          hide: true
        },
        endCoop: {
          text: '提交', //按钮名称
          hide: false,
          tip: '是否确认办结?' //对话框提示语
        },
        abortCoop: {
          hide: true
        }
      }
    }
  ]
}
