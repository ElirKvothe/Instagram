import { Alert, FlatList } from "react-native";
import PostListItem from "~/src/components/PostListItem";
import posts from "~/assets/data/posts.json";
import { useEffect, useState } from "react";
import { supabase } from "~/src/lib/supabase";

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let { data, error } = await supabase.from("posts").select("*, user:profiles(*)");
    if(error){
      Alert.alert("Something went wrong");
    }
    setPosts(data);
  };

  console.log(posts)

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      contentContainerStyle={{
        gap: 10,
        maxWidth: 512,
        alignSelf: "center",
        width: "100%",
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}
