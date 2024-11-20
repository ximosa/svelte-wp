<script>
  export let data;
  const post = data.post;
</script>

<div style="max-width: 800px; margin: auto; padding: 1rem;font-size: 1.2rem;">
  <a class="button transparent" href="/blogger"> Volver a blogger</a>
  <h1 class="small medium-padding large-margin">{post.title}</h1>
  <hr class="large">
  <div class="extra-line">
    {@html post.content}
  </div>
</div>
