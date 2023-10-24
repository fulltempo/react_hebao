import styles from '../layouts/index.less';
import {
  PageContainer,
  ModalForm,
  ProFormMoney
} from '@ant-design/pro-components';
import { MinusOutlined, PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Form, Button, Dropdown, Space, Tag, message } from 'antd';
import { useState } from 'react';
import Decimal from 'decimal.js';

export default function HomePage() {
  type Data = { id: string, name: string, image: string, tag_color: string, tag: string, desc: string, date: string }[];
  type DataItem = (Data)[number];

  const historyData: Data = [];
  const [num, setNum] = useState(0.00);
  const [dataSource, setDataSource] = useState<DataItem[]>(historyData);
  const [isBenefit, setIsBenefit] = useState(false);

  const [form] = Form.useForm<{ money: number; }>();


  function handleBenefitToggle() {
    setIsBenefit(prev => !prev);
    message.success(isBenefit ? '收益已关闭' : '收益已开启');
  }

  function getTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    return (
      year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds
    )
  }

  function handleIn(inNum: number): any {
    const decimalNum = new Decimal(num);
    const decimalInNum = new Decimal(inNum);

    const result = decimalNum.plus(decimalInNum);

    setNum(Number(result));
    setDataSource(prevData => [...prevData, {
      id: (prevData.length + 1).toString(),
      name: 'awdawdaw',
      image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      tag_color: 'blue',
      tag: '转入',
      desc: getTime() + ' - ' + '转入' + inNum + '元',
      date: getTime()
    }]);
    return message.success('转入成功');
  }

  function handleOut(outNum: number) {
    const decimalNum = new Decimal(num);
    const decimalOutNum = new Decimal(outNum);

    if (decimalNum.gte(decimalOutNum)) {
      const result = decimalNum.minus(decimalOutNum);
      setNum(Number(result));
      setDataSource(prevData => [...prevData, {
        id: (prevData.length + 1).toString(),
        name: 'awdawdaw',
        image: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        tag_color: 'red',
        tag: '转出',
        desc: getTime() + ' - ' + '转出' + outNum + '元',
        date: getTime()
      }]);
      return message.success('转出成功');
    }
    else {
      return message.error('余额不足无法转出');
    }
  }

  return (
    <div>
      <div className={styles.background1}>
      </div>
      <div className={styles.background2}>
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <PageContainer
            ghost
            header={{
              title: '⛰️攒钱去旅行',
              extra: [
                <Dropdown
                  key="dropdown"
                  trigger={['click']}
                  menu={{
                    items: [
                      {
                        label: '下拉菜单',
                        key: '1',
                      },
                      {
                        label: '下拉菜单2',
                        key: '2',
                      },
                    ],
                  }}
                >
                  <Button key="1" style={{ padding: '0 8px' }}>
                    <EllipsisOutlined />
                  </Button>
                </Dropdown>,
              ],
            }}
            content={
              <div className={styles.total}>
                <div className='top'>
                  <p>总金额(元)</p>
                </div>
                <div className='center'>
                  <h1>{num}</h1>
                </div>
                <div className={styles.bonus}>
                  <div>
                    <Button type={isBenefit ? 'primary' : 'default'} danger size='small' onClick={handleBenefitToggle}>
                      {isBenefit ? '关闭收益' : '开启收益'}
                    </Button>
                  </div>

                </div>
                <div className='bottom'>
                  <div className={styles.operation}>
                    <div className={styles.item}>
                      <ModalForm<{
                        money: number
                      }>
                        title="转出金额"
                        trigger={
                          <Button type="dashed">
                            <MinusOutlined />
                            转出
                          </Button>
                        }
                        form={form}
                        autoFocusFirstInput
                        modalProps={{
                          destroyOnClose: true,
                          onCancel: () => console.log('run'),
                        }}
                        submitTimeout={2000}
                        onFinish={async (values) => {
                          handleOut(values.money);
                          return true;
                        }}
                      >
                        <ProFormMoney
                          label='转出金额'
                          name='money'
                          initialValue={0.01}
                          fieldProps={{ precision: 2 }}
                          customSymbol="💰"
                          min={0.01}
                        />
                      </ModalForm>
                    </div>
                    <div className={styles.item}>
                      <ModalForm<{
                        money: number
                      }>
                        title="转入金额"
                        trigger={
                          <Button type="dashed">
                            <PlusOutlined />
                            转入
                          </Button>
                        }
                        form={form}
                        autoFocusFirstInput
                        modalProps={{
                          destroyOnClose: true,
                          onCancel: () => console.log('run'),
                        }}
                        submitTimeout={2000}
                        onFinish={async (values) => {
                          handleIn(values.money);
                          return true;
                        }}
                      >
                        <ProFormMoney
                          label='转入金额'
                          name='money'
                          initialValue={0.01}
                          fieldProps={{ precision: 2 }}
                          customSymbol="💰"
                          min={0.01}
                        />
                      </ModalForm>
                    </div>
                  </div>
                </div>
              </div>
            }
          >
          </PageContainer>
        </div>

        <div className={styles.center}>
          <div className={styles.item}><p>付款</p></div>
          <div className={styles.item}><p>收款</p></div>
          <div className={styles.item}><p>自动攒</p></div>
          <div className={styles.item}><p>限额</p></div>
          <div className={styles.item}><p>权益</p></div>
        </div>
        <div className={styles.bottom}>
          <PageContainer
            tabList={[
              {
                tab: '账单',
                key: '1',
              },
            ]}
          >
          </PageContainer>
          <ProList<DataItem>
            rowKey="id"
            dataSource={[...dataSource].reverse()}
            showActions="hover"
            metas={{
              title: {
                dataIndex: 'name',
              },
              avatar: {
                dataIndex: 'image',
                editable: false,
              },
              description: {
                dataIndex: 'desc',
              },
              subTitle: {
                render: (text, row, index, action) => {
                  return (
                    <Space size={0}>
                      <Tag color={row.tag_color}>{row.tag}</Tag>
                    </Space>
                  );
                },
              },
            }}
          />
        </div>
      </div>

    </div >
  );
}
