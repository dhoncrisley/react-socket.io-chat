import styled from "styled-components";

export const ChatWrapper = styled.div`
  background-color: "#fefefe";
  margin: 10px 5px;
  display: flex;

  flex: 3;
  border: 1px solid #ddd;
  border-radius: 5px;
  /* height: calc(100% - 25px); */
  padding: 0 15px;
  flex-direction: column;
`;
export const ChatMessageWrapper = styled.div`
  flex: 1;
  display: flex;
  margin: 10px 0;
  overflow-y: scroll;
  padding: 0px 10px;
  flex-direction: column-reverse;
`;
export const MessageWrapper = styled.div`
  display: flex;
  border-radius: 25px;
  margin-top: 10px;
  background-color: #eee;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px 20px;
  ${({ senderId, userId }) =>
    senderId != userId
      ? `
		align-self: flex-start;
		text-align: left;
		`
      : `
		align-self: flex-end;
		text-align: right;
	 `};
`;
export const MessageDate = styled.span`
  color: #333;
  margin-left: 10px;
  font-size: 12pt;
`;
export const MessageSender = styled(MessageDate)`
  font-size: 16px;
  margin-left: 0;
  margin-bottom: 5px;
  font-weight: 900;
`;
export const MessageText = styled.p`
  color: #333;
  font-size: 14pt;
`;

export const MessageInput = styled.input`
  padding: 10px;
  border-radius: 25px;
  margin-bottom: 15px;
  border: 1px solid gray;
  outline: none;

  :focus {
    border-radius: 25px;
    outline: none;
  }
`;
