export function togglePasswordVisibility(node: import('@formkit/vue').VirtualNode) {
    if (!node.props) return;
  
    node.props.suffixIcon = node.props.suffixIcon === "eye" ? "eyeClosed" : "eye";
    node.props.type = node.props.type === "password" ? "text" : "password";
  }