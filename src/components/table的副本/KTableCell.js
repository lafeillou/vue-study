export default {
    functional: true,

    props: ['column', 'row'],

    render(createElement, { props }) {

        console.log(props)

        const data = {};
        
        // 单元格样式
        if (props.column.cellClass) {
            data.class = props.column.cellClass;
        }

        if (props.column.template) {
            return createElement('td', data, props.column.template(props.row.data));
        }

        data.domProps = {};
        data.domProps.innerHTML = props.column.formatter(props.row.getValue(props.column.prop), props.row.data);

        return createElement('td', data);
    },
};