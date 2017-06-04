<?php
function menu($active) { ?>
  <div class="portal-menu">
    <div class="portal-menu-title" id="menu-title">
      <div>menu</div>
      <div>
        <img id="menu-magnet" src="/images/owl-magnet-inactive.png"
          height="60" width="60"></img>
        </div>
    </div>
    <div class="portal-menu-content" id="menu-content">
      <?php
      $sections = array("home", "resources", "activities", "access", "profile");
      $urls = array("", "resources", "activities", "volunteer-access", "profile");
      $names = array("Home", "Learning Resources", "Activities", "Volunteer Access", "Profile");
      foreach ($sections as $i => $section) { ?>
        <!-- TODO: Change the hardcoded 25 height/width -->
        <div class="portal-menu-item-<?php echo $section;?>">
          <img src="/images/<?php echo $section.(($active == $i) ? '-' : '-in');?>active.png" height="25" width="25"></img>
          <?php if ($active == $i) {
            echo $names[$i];
          } else { 
            echo '<a href="/'.$urls[$i].'">'.$names[$i].'</a>';
          } ?>
        </div>
      <?php } ?>
      <div class="portal-menu-item-contact">
        Kinspire UW <br/>
        Contact us: kinspire@uw.edu<br/>
        2017
      </div>
    </div>
  </div>
<?php }?>