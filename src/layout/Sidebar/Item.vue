<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];
    if (icon) {
      vnodes.push(<span class="menu--collapes-icon"><svg-icon icon={icon} class-name="menu_svg" /></span>);
    }
    if (title) {
      vnodes.push(<span slot="title">{title}</span>);
    }

    return vnodes;
  },
};
</script>
<style>
.menu_svg{
    margin-left: 5px;
    margin-right: 10px;
    width: 1rem !important;
    height: 1.1rem !important;
}
</style>
