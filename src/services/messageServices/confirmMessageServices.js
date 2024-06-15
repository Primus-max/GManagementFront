import { ElMessageBox } from 'element-plus';

const ConfirmMessageService = {
    info(message) {
        return ElMessageBox.confirm(message, 'Внимание!', {
            confirmButtonText: 'Ок',
            type: 'info',
            showCancelButton: false
        });
    }
}

 export default ConfirmMessageService