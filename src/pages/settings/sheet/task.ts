const TASK_FORM_DATA: Record<string, any> = {
  title: '任务单.template.xlsx',
  baseinfo: {
    drawarea: 'I40',
    exportNoPage: true
  },
  cells: {
    C2: {
      text: '广州华鑫检测技术有限公司',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '27px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    H2: {
      text: '本单位填写',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    H3: {
      text: '报告编号',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    C4: {
      text: '环境检测委托单',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '13px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    G4: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif"
      }
    },
    H4: {
      text: '接单日期',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    G5: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif"
      }
    },
    H5: {
      text: '完成日期',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A6: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    B6: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    C6: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    D6: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    E6: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    F6: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    G6: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif"
      }
    },
    H6: {
      text: '跟单代表',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A7: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    B7: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    C7: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    D7: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    E7: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    F7: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    G7: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif"
      }
    },
    H7: {
      text: '业务助理',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A8: {
      text: '委  托  单  位',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A9: {
      text: '委托单位联系人、电话',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A10: {
      text: '委托单位地址',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A11: {
      text: '受  检  单  位',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A12: {
      text: '受检单位联系人、电话',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A13: {
      text: '受检单位地址',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A14: {
      text: '检\n\n测\n\n内\n\n容',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        wordWrap: true,
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    C14: {
      text: '序号',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    D14: {
      text: '类别',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000'
      }
    },
    F14: {
      text: '点位(多个点位请用；或;分隔)',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    G14: {
      text: '检测项目',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    H14: {
      text: '监测频次',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A20: {
      text: '检 测 目 的',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A21: {
      text: '拟 派 采 样 组 长',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    G21: {
      text: '拟 派 采 样 成 员',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A22: {
      text: '现 场 更 改',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    G22: {
      text: '变更原因：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A23: {
      text: '服务时限',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000'
      }
    },
    C23: {
      text: '是否加急',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000'
      }
    },
    E23: {
      text: '采样后',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000'
      }
    },
    G23: {
      text: '个工作日完成；',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000'
      }
    },
    I23: {
      text: '天完成',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'left',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A24: {
      text: '报告要求',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    C24: {
      text: '1、打印份数：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderLeft: '1px solid #000000'
      }
    },
    H24: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        borderRight: '1px solid #000000'
      }
    },
    C25: {
      text: '2、报告形式：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderLeft: '1px solid #000000'
      }
    },
    H25: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        borderRight: '1px solid #000000'
      }
    },
    C26: {
      text: '3、附标准限值：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderLeft: '1px solid #000000'
      }
    },
    H26: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        borderRight: '1px solid #000000'
      }
    },
    C27: {
      text: '4、附评价：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderLeft: '1px solid #000000'
      }
    },
    H27: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        borderRight: '1px solid #000000'
      }
    },
    C28: {
      text: '5、附照片：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderLeft: '1px solid #000000'
      }
    },
    H28: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        borderRight: '1px solid #000000'
      }
    },
    C29: {
      text: '6、质控报告：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000'
      }
    },
    H29: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        borderBottom: '1px solid #000000',
        borderRight: '1px solid #000000'
      }
    },
    A30: {
      text: '分析方法：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000'
      }
    },
    A31: {
      text: '执行标准：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000'
      }
    },
    A32: {
      text: '金额（元）：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000'
      }
    },
    A33: {
      text: '备注：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000'
      }
    },
    A34: {
      text: '陪同人：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderTop: '1px solid #000000',
        borderLeft: '1px solid #000000'
      }
    },
    A35: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderLeft: '1px solid #000000'
      }
    },
    B35: {
      text: '我方已确认检测项目无误，与实际相符。',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'left',
        borderRight: '1px solid #000000'
      }
    },
    A36: {
      text: '签名：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderBottom: '1px solid #000000',
        borderLeft: '1px solid #000000'
      }
    },
    F36: {
      text: '日期：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center',
        borderBottom: '1px solid #000000'
      }
    },
    A37: {
      text: '温馨提示：',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    C37: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    D37: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    E37: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    F37: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    G37: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    H37: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    I37: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    A38: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    B38: {
      text: '1.对检测结果若有异议，应于收到我方报告之日起十个工作日内提出书面意见，逾期不予受理。',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'left'
      }
    },
    A39: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    B39: {
      text: '2.属于委托方送样检验检测的，检测报告仅对来样检验检测项目负责。',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'left'
      }
    },
    A40: {
      text: '',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'center'
      }
    },
    B40: {
      text: '3.为支持检测工作的公平、公正、准确、高效，欢迎客户对采样工作的监督，如有异议请致电：020-32200580',
      style: {
        fontFamily: "'宋体', SimSun, Serif",
        fontSize: '12px',
        color: '#000000',
        verticalAlign: 'middle',
        textAlign: 'left'
      }
    }
  },
  spans: [
    'A2:B5',
    'C2:G3',
    'H2:I2',
    'C4:F5',
    'A8:B8',
    'C8:I8',
    'A9:B9',
    'C9:G9',
    'H9:I9',
    'A10:B10',
    'C10:I10',
    'A11:B11',
    'C11:I11',
    'A12:B12',
    'C12:G12',
    'H12:I12',
    'A13:B13',
    'C13:I13',
    'A14:B19',
    'D14:E14',
    'H14:I14',
    'A20:B20',
    'C20:I20',
    'A21:B21',
    'C21:F21',
    'H21:I21',
    'A22:B22',
    'C22:F22',
    'H22:I22',
    'A23:B23',
    'A24:B29',
    'C24:E24',
    'H24:I24',
    'C25:E25',
    'H25:I25',
    'C26:E26',
    'F26:G26',
    'H26:I26',
    'C27:E27',
    'F27:G27',
    'H27:I27',
    'C28:E28',
    'F28:G28',
    'H28:I28',
    'C29:E29',
    'F29:G29',
    'H29:I29',
    'A30:B30',
    'C30:I30',
    'A31:B31',
    'C31:I31',
    'A32:B32',
    'C32:I32',
    'A33:B33',
    'C33:I33',
    'A34:B34',
    'C34:I34',
    'B35:I35',
    'A36:B36',
    'C36:E36',
    'G36:I36',
    'A37:B37',
    'B38:I38',
    'B39:I39',
    'B40:I40'
  ],
  xlsxRowHeight: {
    '0': 15,
    '1': 20,
    '2': 20,
    '3': 20,
    '4': 20,
    '5': 20,
    '6': 20,
    '7': 20,
    '8': 20,
    '9': 20,
    '10': 20,
    '11': 20,
    '12': 20,
    '13': 20,
    '14': 39.75,
    '15': 39.75,
    '16': 39.75,
    '17': 39.75,
    '18': 39.75,
    '19': 21,
    '20': 20,
    '21': 20,
    '22': 20,
    '23': 20,
    '24': 20,
    '25': 20,
    '26': 20,
    '27': 20,
    '28': 20,
    '29': 20,
    '30': 20,
    '31': 20,
    '32': 20,
    '33': 20,
    '34': 20,
    '35': 20,
    '36': 20,
    '37': 20,
    '38': 20,
    '39': 20
  },
  xlsxColWidth: {
    A: 7.125,
    B: 14.375,
    C: 10.7109375,
    D: 7.421875,
    E: 9.8515625,
    F: 23.00390625,
    G: 22.140625,
    H: 17.375,
    I: 18.421875
  },
  rowHeight: {
    '0': 20,
    '1': 27,
    '2': 27,
    '3': 27,
    '4': 27,
    '5': 27,
    '6': 27,
    '7': 27,
    '8': 27,
    '9': 27,
    '10': 27,
    '11': 27,
    '12': 27,
    '13': 27,
    '14': 53,
    '15': 53,
    '16': 53,
    '17': 53,
    '18': 53,
    '19': 28,
    '20': 27,
    '21': 27,
    '22': 27,
    '23': 27,
    '24': 27,
    '25': 27,
    '26': 27,
    '27': 27,
    '28': 27,
    '29': 27,
    '30': 27,
    '31': 27,
    '32': 27,
    '33': 27,
    '34': 27,
    '35': 27,
    '36': 27,
    '37': 27,
    '38': 27,
    '39': 27
  },
  colWidth: {
    A: 57,
    B: 115,
    C: 86,
    D: 59,
    E: 79,
    F: 184,
    G: 177,
    H: 139,
    I: 147
  },
  data: [
    {
      entity: '$data.table',
      layout: 'table',
      area: 'C15:I19',
      pk: '',
      bind: {
        C15: {
          field: '$rownum',
          type: 'string',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        D15: {
          field: 'InspectTypeName',
          type: 'lims-inspecttypepick-cell',
          required: true,
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000'
          },
          colspan: 2
        },
        F15: {
          field: 'MonitorPlace',
          type: 'string',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        G15: {
          field: 'AnalysisItems',
          type: 'lims-analysisitempick-cell',
          required: true,
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        H15: {
          field: 'F_InspectfreqJSON',
          type: 'lims-inspectfrequency-cell',
          required: true,
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          },
          colspan: 2
        }
      }
    },
    {
      entity: '$data.form',
      layout: 'form',
      bind: {
        A2: {
          field: 'LOGO',
          type: 'image',
          default: '/lims/Static/LOGO_HuaXin.jpg',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            wordWrap: true
          }
        },
        I3: {
          field: 'ProjectCode',
          type: 'projectcode-cell',
          required: true,
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        I4: {
          field: 'ProjectDate',
          type: 'datetime',
          options: {
            fmt: 'YYYY年MM月DD日'
          },
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        I5: {
          field: 'overdate',
          type: 'datetime',
          options: {
            fmt: 'YYYY年MM月DD日'
          },
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        I6: {
          field: 'documentary',
          type: 'lims-selectuser-cell',
          options: {
            roleKey: ['salesperson']
          },
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        I7: {
          field: 'assistant',
          type: 'span',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C8: {
          field: 'F_EntrustUnitJSON',
          type: 'lims-selectunit-cell',
          required: true,
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C9: {
          type: 'string',
          formula: '=C8.Linkman',
          field: 'EntrustUnitLinkMan',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000'
          }
        },
        H9: {
          type: 'string',
          formula: '=C8.Phone',
          field: 'EntrustUnitPhone',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C10: {
          type: 'string',
          formula: '=C8.UnitAddress',
          field: 'EntrustUnitAddress',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C11: {
          field: 'F_InspectUnitJSON',
          type: 'lims-selectunit-cell',
          required: true,
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C12: {
          type: 'string',
          formula: '=C11.Linkman',
          field: 'InspectUnitLinkMan',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000'
          }
        },
        H12: {
          type: 'string',
          formula: '=C11.Phone',
          field: 'InspectUnitPhone',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C13: {
          type: 'string',
          formula: '=C11.UnitAddress',
          field: 'InspectUnitAddress',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C20: {
          field: 'Type',
          label: '检测目的',
          type: 'select',
          required: true,
          options: '$userdata.projectTypes',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C21: {
          field: 'leader',
          type: 'lims-selectuser-cell',
          options: {
            roleKey: ['pickA', 'pickB', 'pickC', 'pickD', 'pickE', 'pickF']
          },
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        H21: {
          field: 'Member',
          type: 'lims-selectuser-cell',
          options: {
            roleKey: ['pickA', 'pickB', 'pickC', 'pickD', 'pickE', 'pickF'],
            multiple: true
          },
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C22: {
          field: 'change',
          type: 'string',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        H22: {
          field: 'reason',
          type: 'string',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        D23: {
          field: 'Urgent',
          type: 'select',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#FF0000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000'
          },
          options: ['否', '是'],
          default: '否'
        },
        F23: {
          field: 'ProjectCycle',
          type: 'select',
          options: '$userdata.workCycle',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000'
          }
        },
        H23: {
          field: 'ProjectCycleCalendar',
          type: 'number',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'right',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000'
          }
        },
        F24: {
          field: 'requirements0',
          type: 'checkbox',
          options: {
            entity: ['2份', '其他'],
            separator: ','
          },
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderTop: '1px solid #000000'
          }
        },
        G24: {
          field: 'requirements1',
          type: 'string',
          default: '（要求：      份）',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            borderTop: '1px solid #000000'
          }
        },
        F25: {
          field: 'requirements2_1',
          type: 'checkbox',
          options: {
            entity: ['整体报告', '拆分报告'],
            separator: ','
          },
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center'
          }
        },
        G25: {
          field: 'requirements2_2',
          type: 'string',
          default: '（要求：      ）',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle'
          }
        },
        F26: {
          field: 'requirements3',
          type: 'checkbox',
          options: {
            entity: ['是', '否'],
            separator: ','
          },
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'left'
          }
        },
        F27: {
          field: 'requirements4',
          type: 'checkbox',
          options: {
            entity: ['是', '否'],
            separator: ','
          },
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'left'
          }
        },
        F28: {
          field: 'requirements5',
          type: 'checkbox',
          options: {
            entity: ['是', '否'],
            separator: ','
          },
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'left'
          }
        },
        F29: {
          field: 'requirements6',
          type: 'checkbox',
          options: {
            entity: ['需要', '不需要'],
            separator: ','
          },
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'left',
            borderBottom: '1px solid #000000'
          }
        },
        C30: {
          field: 'AnaMethodAccord',
          type: 'lims-basismethod2-cell',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'left',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C31: {
          field: 'Standard',
          type: 'dischargestandard-cell',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'left',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C32: {
          field: 'money',
          type: 'string',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'left',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C33: {
          field: 'Mem',
          type: 'string',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'left',
            borderTop: '1px solid #000000',
            borderBottom: '1px solid #000000',
            borderLeft: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C34: {
          field: 'Accompanied',
          type: 'string',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'left',
            borderTop: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        },
        C36: {
          field: 'signature',
          type: 'string',
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'center',
            borderBottom: '1px solid #000000'
          }
        },
        G36: {
          field: 'sDate',
          type: 'datetime',
          options: {
            fmt: 'MM月DD日'
          },
          style: {
            fontFamily: "'宋体', SimSun, Serif",
            fontSize: '12px',
            color: '#000000',
            verticalAlign: 'middle',
            textAlign: 'left',
            borderBottom: '1px solid #000000',
            borderRight: '1px solid #000000'
          }
        }
      }
    }
  ]
}
export default TASK_FORM_DATA
