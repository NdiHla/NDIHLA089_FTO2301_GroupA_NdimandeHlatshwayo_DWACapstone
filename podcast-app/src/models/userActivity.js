// import { storeToRefs } from 'pinia';
// import { useAppStore } from '@/store/app';
// import { supabase } from "@/clients/supabase";

// const { userActivity } = storeToRefs(useAppStore())

// async function insertData(userActivity) {
//     try {
//       const { data, error } = await supabase
//         .from('user_activity') // Replace 'your_table_name' with the actual name of your table
//         .insert({
//           user_email: userActivity.email,
//           podcast_id: userActivity.podcast_id,
//           season: userActivity.season,
//           episode: userActivity.episode,
//           timestamp: userActivity.timestamp,
//         });

//       if (error) {
//         console.error('Error inserting data:', error.message);
//       } else {
//         console.log('Data inserted successfully:', data);
//         // Optionally, you can reset the form fields after successful insertion
//         name.value = '';
//         email.value = '';
//       }
//     } catch (error) {
//       console.error('Error inserting data:', error.message);
//     }
//   }

// .insert([{ name: name.value, email: email.value }]);
