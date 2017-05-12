public class Story {
    private static final int STORY_NUMBER = 1;

    public static void main(String[] args) {
        
        $storyJson = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'].'/content/stories/'.$_GET['id'].'.json'), true);

            foreach ($storyJson["story"] as $paragraph) {
              $words = split(" ", $paragraph);
              
              
              echo '<br/><br/>';
            }
    }
}