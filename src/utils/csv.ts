import { isEmpty } from 'lodash'
import { readRemoteFile } from 'react-papaparse'


export const parseCSVData = (path: string, callback: any) => {
    let fields: string[] = []
    const data: string[][] = []
    readRemoteFile<string[]>(path, {
        worker: false,
        step: (results) => {
            if (isEmpty(fields)) {
                fields = [...results.data]
            }
            else {
                if ((results.data).length === fields.length) {
                    data.push(results.data)
                }
            }
        },
        download: true,
        complete: function (results: any, file: any): void {
            callback(fields, data)
        }
    })
}