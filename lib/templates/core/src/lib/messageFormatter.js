class MessageFormatter {

    _buildMessage = (rawMsg) => {

        let xMsg = "unknown error";
        if (rawMsg.message) {
            xMsg = rawMsg.message;
        } else {
            xMsg = rawMsg;
        }
        return {
            message: xMsg,
            type: rawMsg.type || "",
            path: rawMsg.path || "",
            value: (typeof rawMsg.value === 'string') ? rawMsg.value : null
        };
    } 

    formatMessage = (isError=false, messages, data=null) => {
        let formattedMessages = [];
        if (typeof messages === 'string') {
            formattedMessages.push(this._buildMessage(messages));
        } else {
            formattedMessages = messages.reduce((newMessage, xMsg) => {
                if (typeof xMsg === 'object') {
                    newMessage.push(this._buildMessage(xMsg));
                } else {
                    newMessage.push(this._buildMessage(xMsg));
                }
                return newMessage;
            }, []);
        }
        
        return {
            isError: isError,
            messages: formattedMessages,
            data: data
        };

    }

}

export default new MessageFormatter;