import React, { Suspense, useState, useEffect } from 'react'
import useHandleTabClose from '../../hooks/handleTabClose.hook'
import { Button, Skeleton } from 'antd'
import axios from '../../utils/request'
import { DocumentEditor } from '@onlyoffice/document-editor-react'
import { APP_DOCUMENT_SERVER } from '../../../shared/constants/env'

const WINDOWS_NAME = 'office'
// 编辑器配置项，完整配置项参见：https://api.onlyoffice.com/editors/config/
const editorConfig = {
  // 编辑器宽度
  width: '100%',
  // 编辑器高度
  height: '100%',
  // 编辑器类型，支持 word、cell（表格）、slide（PPT）
  documentType: 'word',
  // 文档配置
  document: {
    // 文件类型
    fileType: 'docx',
    // 文档标识符
    key: 'test1.docx' + Math.random(),
    // 文档地址，绝对路径
    url: `${APP_DOCUMENT_SERVER}/assets/word/test1.docx?r=` + Math.random(),
    // 文档标题
    title: '测试文档一.docx',
    // 权限
    permissions: {
      // 启用评论
      comment: false,
      // 启用下载
      download: true,
      // 启用编辑
      edit: true,
      // 启用导出
      print: true,
      // 启用预览
      review: true
    },
    history: {
      serverVersion: Math.random() + ''
    }
  },
  editorConfig: {
    // 回调地址
    callbackUrl: `${APP_DOCUMENT_SERVER}/api/onlyoffice/callback`,
    // 设置语言
    lang: 'zh-CN',
    // customization 字段相关配置详解：https://api.onlyoffice.com/editors/config/editor/customization
    customization: {
      // 强制保存
      forcesave: true,
      features: {
        // 关闭拼写检查
        spellcheck: false
      }
    }
  }
}

function OnlyOffice() {
  useHandleTabClose(WINDOWS_NAME)

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    document.title = '在线office'
  }, [])
  const onSave = async () => {
    setLoading(true)
    axios
      .post('/document/forceSave', {
        id: 1,
        key: editorConfig.document.key
      })
      .then(res => {
        console.log(res, 'res')

        if (res.data.code === 0) {
          this.$message.success('保存成功')
        } else {
          this.$message.error(res.data.message)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const onLoadComponentError = function (errorCode, errorDescription) {
    switch (errorCode) {
      case -1: // Unknown error loading component
        console.log(errorDescription)
        break

      case -2: // Error load DocsAPI from http://documentserver/
        console.log(errorDescription)
        break

      case -3: // DocsAPI is not defined
        console.log(errorDescription)
        break
    }
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh'
      }}
    >
      <Suspense fallback={<>加载中...</>}>
        <DocumentEditor
          id='onlyOffice'
          width='100%'
          height='100%'
          documentServerUrl='https://8.142.84.187:2800/'
          config={{
            document: {
              fileType: 'docx',
              key: `test.docx`,
              title: '测试文档一.docx',
              url: `https://8.142.84.187/assets/word/test.docx`,
              // 权限
              permissions: {
                // 启用评论
                comment: false,
                // 启用编辑
                edit: true,
                // 启用下载
                download: false,
                // 启用导出
                print: true,
                // 启用预览
                review: true
              }
            },
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiem9ycSJ9.NVGdBwXeBG3cLjBi8-L3FWA_-Zz2UINgcHqqbcKvukY',
            documentType: 'word',
            editorConfig: {
              // 回调地址
              callbackUrl: `https://8.142.84.187/api/onlyoffice/callback`,
              // 设置语言
              lang: 'zh-CN',
              customization: {
                // 强制保存
                forcesave: true,
                features: {
                  // 关闭拼写检查
                  spellcheck: false
                }
              }
            }
          }}
          onLoadComponentError={onLoadComponentError}
        />
      </Suspense>
      <Skeleton
        style={{ width: `${editorConfig.width}`, position: 'fixed', top: '0' }}
        active
        paragraph={{ rows: 10 }}
        loading={loading}
      >
        <Button
          style={{ position: 'fixed', right: '120px', top: '10px' }}
          type='primary'
          onClick={onSave}
          loading={loading}
        >
          保存文档
        </Button>
      </Skeleton>
    </div>
  )
}

export default OnlyOffice
