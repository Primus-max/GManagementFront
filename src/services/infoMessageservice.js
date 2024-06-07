import { ElMessage } from 'element-plus';

const MessageService = {
  info(message) {
    ElMessage.info(message);
  },
  success(message) {
    ElMessage.success(message);
  },
  warning(message) {
    ElMessage.warning(message);
  },
  error(message) {
    ElMessage.error(message);
  }
};

export default MessageService;