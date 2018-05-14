import React, { Component } from 'react';
import { Card, Icon, message, Popover, Popconfirm } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { jsonToObjEscape } from 'util/json'
import QRCode from 'qrcode.react';
import styles from '../index.css';

const { Meta } = Card;

const success = text => {
    message.success(text);
};

export const PageCard = ({ schemaData, deleteSchemaById }) => {
    const { url, schema, id } = schemaData;
    const { baseData } = JSON.parse(jsonToObjEscape(schema));
    const { title, description, bg } = baseData;

    return (
      <Card
        className={styles['page-card']}
        cover={<img alt="example" src={bg} />}
        hoverable={true}
        bodyStyle={{
          position: 'absolute',
          bottom: 47,
          backgroundColor: 'rgba(0,0,0,.55)',
          width: '100%'
          }}
        actions={[
            <Icon type="setting" />,
            <CopyToClipboard text={url}>
                <Icon onClick={success.bind(null, '链接以复制到剪贴板')} type="link" />
            </CopyToClipboard>,
            <Popover content={(<QRCode value={url} />)} trigger="click">
                <Icon onClick={success.bind(null, '手机扫描二维码来浏览H5页面')} type="qrcode" />
            </Popover>,
            <Popconfirm title="确定删除？" onConfirm={deleteSchemaById.bind(null, id)} okText="删除" cancelText="取消">
                <Icon type="delete" />
            </Popconfirm>]}
      >
          <Meta
            title={(<span style={{color: 'rgb(255,255,255)'}}>{title}</span>)}
            description={(<span style={{color: 'rgb(255,255,255)'}}>{description}</span>)}
          />
      </Card>
    )
}

export const AddCard = ({ userInfo }) => {

    return (
      <Card className={styles['add-box']} hoverable={true}>
          <div className={styles['add-card']}></div>
      </Card>
    )
}
