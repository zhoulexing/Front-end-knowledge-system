import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import style from './index.less';

export default class MyReactTable extends Component {
    render() {
        return (
          <ReactTable
              columns={this.getColumns()}
              data={this.getData()}
              getTdProps={(a, b, c) => ({
                    style: {
                        borderRight: b && b.original.firstName === 'zhou' ? 'none' : '1px solid #eee',
                    },
                })}
            />
        );
    }

    getData() {
        return [{
            firstName: 'zhou',
            lastName: 'lx',
            age: 29,
            gender: '男',
        }, {
            firstName: 'yang',
            lastName: 'ww',
            age: 28,
            gender: '女',
        }];
    }

    getColumns() {
        return [{
            Header: 'First Name',
            accessor: 'firstName',
        },
        {
            Header: 'Last Name',
            accessor: 'lastName',
        },
        {
            Header: 'Age',
            accessor: 'age',
        },
        {
            Header: 'Gender',
            accessor: 'gender',
        }];
    }
}
