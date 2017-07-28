<?php require $_SERVER['DOCUMENT_ROOT']."/includes/scaffolder.php";
head('Volunteer Access', 3);?>
<div class="portal-body">
  <form action="submit.php" method="post" name="volunteer-access">
    <div class="volunteer-access-question">
      <textarea name="question" class="volunteer-access-text" rows="5" placeholder="Type your question here"></textarea>
    </div>
    <div class="volunteer-access-comments">
      <textarea name="comments" class="volunteer-access-text" rows="3" placeholder="Additional comments"></textarea>
    </div>
    <div class="volunteer-access-submit-area">
      <input type="submit" value="Submit" class="volunteer-access-submit">
    </div>
  </form>
</div>
<?php tail(); ?>
