// Sample location data and municipality coordinates

const sampleLocations = [
    {
        lat: 13.7565, lng: 121.0583,
        municipality: 'Batangas City', barangay: 'Poblacion', street: 'P. Burgos St.',
        contact: '0917-123-4567', contactName: 'Juan Dela Cruz',
        needs: ['water', 'food'], people: 15, status: 'needs', urgency: 'high',
        time: '2 hours ago', notes: 'Flood victims, urgent water needed'
    },
    {
        lat: 13.9411, lng: 121.1633,
        municipality: 'Lipa City', barangay: 'Barangay 1', street: 'Rizal Ave.',
        contact: '0918-234-5678', contactName: 'Maria Santos',
        needs: ['medical', 'food'], people: 8, status: 'needs', urgency: 'critical',
        time: '3 hours ago', notes: 'Elderly residents with medical conditions'
    },
    {
        lat: 14.0583, lng: 121.1522,
        municipality: 'Tanauan City', barangay: 'Poblacion', street: '',
        contact: '0919-345-6789', contactName: 'Pedro Reyes',
        needs: ['shelter'], people: 20, status: 'served', urgency: 'medium',
        time: '5 hours ago', notes: ''
    },
    {
        lat: 13.8333, lng: 120.9333,
        municipality: 'Lemery', barangay: 'Barangay Mataas na Bayan', street: 'Purok 3',
        contact: '0920-456-7890', contactName: 'Ana Garcia',
        needs: ['water', 'medical'], people: 12, status: 'needs', urgency: 'high',
        time: '1 hour ago', notes: 'Children with fever'
    },
    {
        lat: 13.8333, lng: 120.9344,
        municipality: 'Lemery', barangay: 'Matingain 1', street: '',
        contact: '0921-567-8901', contactName: 'Jose Ramos',
        needs: ['food', 'water'], people: 25, status: 'served', urgency: 'low',
        time: '4 hours ago', notes: ''
    },
    {
        lat: 13.9333, lng: 121.0167,
        municipality: 'Santo Tomas', barangay: 'San Bartolome', street: 'Sitio Malabanan',
        contact: '0922-678-9012', contactName: 'Rosa Cruz',
        needs: ['shelter', 'food'], people: 30, status: 'needs', urgency: 'critical',
        time: '30 minutes ago', notes: 'Community evacuation center'
    }
];

// Barangay data for each municipality in Batangas
const barangayData = {
    'Lemery': ['Anak-Dagat', 'Arumahan', 'Ayao-iyao', 'Bagong Pook', 'Bagong Sikat', 'Balanga', 'Bukal', 'Cahilan I', 'Cahilan II', 'Dayapan', 'Dita', 'Gulod', 'Maguihan', 'Mahabang Parang', 'Malinis', 'Mataas na Bayan', 'Matingain I', 'Matingain II', 'Niugan', 'Palanas', 'Payapa Ibaba', 'Payapa Ilaya', 'Rizal', 'Sambal Ibaba', 'Sambal Ilaya', 'San Isidro', 'Sangalang', 'Santo Niño', 'Sinisian', 'Talaga', 'Wawa'],
    'Batangas City': ['Alangilan', 'Balagtas', 'Balete', 'Banaba Center', 'Banaba Ibaba', 'Banaba Silangan', 'Barangay 1 (Poblacion)', 'Barangay 10 (Poblacion)', 'Barangay 11 (Poblacion)', 'Barangay 12 (Poblacion)', 'Barangay 13 (Poblacion)', 'Barangay 14 (Poblacion)', 'Barangay 15 (Poblacion)', 'Barangay 16 (Poblacion)', 'Barangay 17 (Poblacion)', 'Barangay 18 (Poblacion)', 'Barangay 19 (Poblacion)', 'Barangay 2 (Poblacion)', 'Barangay 20 (Poblacion)', 'Barangay 21 (Poblacion)', 'Barangay 22 (Poblacion)', 'Barangay 23 (Poblacion)', 'Barangay 24 (Poblacion)', 'Barangay 3 (Poblacion)', 'Barangay 4 (Poblacion)', 'Barangay 5 (Poblacion)', 'Barangay 6 (Poblacion)', 'Barangay 7 (Poblacion)', 'Barangay 8 (Poblacion)', 'Barangay 9 (Poblacion)', 'Bilogo', 'Bolbok', 'Bukal', 'Calicanto', 'Catandala', 'Concepcion', 'Conde Itaas', 'Conde Labac', 'Cuta', 'Dalig', 'Dela Paz', 'Dela Paz Pulot Aplaya', 'Dela Paz Pulot Itaas', 'Dumantay', 'Gulod Itaas', 'Gulod Labac', 'Haligue Kanluran', 'Haligue Silangan', 'Ilihan', 'Kumba', 'Kumintang Ibaba', 'Kumintang Ilaya', 'Libjo', 'Liponpon, Isla Verde', 'Maapas', 'Mahabang Dahilig', 'Mahabang Parang', 'Mahacot Kanluran', 'Mahacot Silangan', 'Malalim', 'Malibayo', 'Malitam', 'Maruclap', 'Mabacong', 'Pagkilatan', 'Paharang Kanluran', 'Paharang Silangan', 'Pallocan Kanluran', 'Pallocan Silangan', 'Pinamucan', 'Pinamucan Ibaba', 'Pinamucan Silangan', 'Sampaga', 'San Agapito, Isla Verde', 'San Agustin Kanluran, Isla Verde', 'San Agustin Silangan, Isla Verde', 'San Andres, Isla Verde', 'San Antonio, Isla Verde', 'San Isidro', 'San Jose Sico', 'San Miguel', 'San Pedro', 'Santa Clara', 'Santa Rita Aplaya', 'Santa Rita Karsada', 'Santo Domingo', 'Santo Niño', 'Simlong', 'Sirang Lupa', 'Sorosoro Ibaba', 'Sorosoro Ilaya', 'Sorosoro Karsada', 'Tabangao Ambulong', 'Tabangao Dao', 'Tabangao Proper', 'Talahib Pandayan', 'Talahib Payapa', 'Talumpok Kanluran', 'Talumpok Silangan', 'Tinga Itaas', 'Tinga Labac', 'Tulo', 'Wawa'],
    'Lipa City': ['Adya', 'Anilao', 'Anilao-Labac', 'Antipolo del Norte', 'Antipolo del Sur', 'Bagong Pook', 'Balintawak', 'Banaybanay', 'Barangay 12 (Poblacion)', 'Bolbok', 'Bugtong na Pulo', 'Bulacnin', 'Bulaklakan', 'Calamias', 'Cumba', 'Dagatan', 'Duhatan', 'Halang', 'Inosluban', 'Kayumanggi', 'Latag', 'Lodlod', 'Lumbang', 'Mabini', 'Malagonlong', 'Malitlit', 'Marauoy', 'Mataas na Lupa', 'Munting Pulo', 'Pagolingin Bata', 'Pagolingin East', 'Pagolingin West', 'Pangao', 'Pinagkawitan', 'Pinagtongulan', 'Plaridel', 'Poblacion Barangay 1', 'Poblacion Barangay 10', 'Poblacion Barangay 11', 'Poblacion Barangay 2', 'Poblacion Barangay 3', 'Poblacion Barangay 4', 'Poblacion Barangay 5', 'Poblacion Barangay 6', 'Poblacion Barangay 7', 'Poblacion Barangay 8', 'Poblacion Barangay 9', 'Poblacion Barangay 9-A', 'Pusil', 'Quezon', 'Rizal', 'Sabang', 'Sampaguita', 'San Benito', 'San Carlos', 'San Celestino', 'San Francisco', 'San Guillermo', 'San Jose', 'San Lucas', 'San Salvador', 'San Sebastian', 'Santo Niño', 'Santo Toribio', 'Sapac', 'Sico', 'Talisay', 'Tambo', 'Tangob', 'Tanguay', 'Tibig', 'Tipacan'],
    'Tanauan City': ['Altura Bata', 'Altura Matanda', 'Altura-South', 'Ambulong', 'Bagbag', 'Bagumbayan', 'Balele', 'Banjo East', 'Banjo Laurel', 'Banjo West', 'Bilog-Bilog', 'Boot', 'Cale', 'Darasa', 'Gonzales', 'Hernandez', 'Hidalgo', 'Janopol', 'Janopol Oriental', 'Laurel', 'Luyos', 'Mabini', 'Malaking Pulo', 'Maria Paz', 'Maugat', 'Montana', 'Natatas', 'Pagaspas', 'Pantay Matanda', 'Pantay na Munti', 'Poblacion Barangay 1', 'Poblacion Barangay 2', 'Poblacion Barangay 3', 'Poblacion Barangay 4', 'Poblacion Barangay 5', 'Poblacion Barangay 6', 'Poblacion Barangay 7', 'Sala', 'Sambat', 'San Jose', 'Santol', 'Santor', 'Sulpoc', 'Suplang', 'Talaga', 'Tinurik', 'Trapiche', 'Ulango', 'Wawa'],
    'Agoncillo': ['Adia', 'Balangon', 'Banyaga', 'Bilibinwang', 'Coral na Munti', 'Guitna', 'Mabini', 'Pamiga', 'Panhulan', 'Poblacion', 'Pook', 'San Jacinto', 'San Teodoro', 'Santa Cruz', 'Subic Ibaba', 'Subic Ilaya'],
    'Alitagtag': ['Balagbag', 'Concepcion', 'Concordia', 'Dalipit East', 'Dalipit West', 'Dominador East', 'Dominador West', 'Munlawin', 'Muzon', 'Pinagkurusan', 'Ping-As', 'Poblacion East', 'Poblacion West', 'San Jose', 'San Juan', 'Santa Cruz', 'Tadlac'],
    'Balayan': ['Baclaran', 'Barangay 1 (Poblacion)', 'Barangay 10 (Poblacion)', 'Barangay 11 (Poblacion)', 'Barangay 12 (Poblacion)', 'Barangay 2 (Poblacion)', 'Barangay 3 (Poblacion)', 'Barangay 4 (Poblacion)', 'Barangay 5 (Poblacion)', 'Barangay 6 (Poblacion)', 'Barangay 7 (Poblacion)', 'Barangay 8 (Poblacion)', 'Barangay 9 (Poblacion)', 'Caloocan', 'Calzada', 'Canda', 'Cawit', 'Dalig', 'Dao', 'Dilao', 'Carenahan (Doña Ramona Dizon)', 'Durungao', 'Gimalas', 'Gumamela', 'Lagnas', 'Lanatan', 'Langgangan', 'Lucban Putol', 'Lucban Pook', 'Magabe', 'Malalay', 'Munting Tubig', 'Navotas', 'Palikpikan', 'Patugo', 'Pulang Lupa', 'Putingbuhangin', 'Rizal', 'Sala', 'Sampaga', 'San Juan', 'San Piro', 'Santol', 'Sukol', 'Tactac', 'Taludtud', 'Tanggoy', 'Tawiran'],
    'Balete': ['Alangilan', 'Looc', 'Magapi', 'Makina', 'Malabanan', 'Palsara', 'Poblacion', 'Sala', 'Sampalocan', 'San Sebastian', 'Solis'],
    'Bauan': ['As-Is', 'Alagao', 'Aplaya', 'Baguilawa', 'Balayong', 'Balaytigui', 'Bancoro', 'Bolo', 'Bucana', 'Bungahan', 'Colvo', 'Dalig', 'Dao', 'Durungao', 'Gulibay', 'Inicbulan', 'Locloc', 'Lubog', 'Mabini', 'Magalang-Sapa', 'Malindig', 'Manalupang', 'Manalupa', 'Manghinao Proper', 'Manghinao Uno', 'Munlawin', 'New Danglayan', 'Old Danglayan', 'Orense', 'Pitugo', 'Poblacion', 'Pulang Lupa', 'Rizal', 'Sampaguita', 'San Andres Proper', 'San Andres Uno', 'San Diego', 'San Miguel', 'San Pablo', 'San Pedro', 'San Roque', 'San Teodoro', 'Santa Maria', 'Sinala', 'Solis'],
    'Calaca': ['Bagong Tubig', 'Balimbing', 'Banyaga', 'Barangay 1 Poblacion', 'Barangay 2 Poblacion', 'Barangay 3 Poblacion', 'Barangay 4 Poblacion', 'Barangay 5 Poblacion', 'Barangay 6 Poblacion', 'Bigo', 'Bisaya', 'Cahil', 'Calantas', 'Caluangan', 'Camastilisan', 'Carolina', 'Coral ni Lopez', 'Coral ni Bacal', 'Dacanlao', 'Bagong Tala (Guinapuyan)', 'Loma', 'Lumbang', 'Madulao', 'Malakas', 'Matipok', 'Nag-Iba', 'Pangao', 'Pantay', 'Puting Bato East', 'Puting Bato West', 'Salong', 'San Rafael', 'Sinisian', 'Taklang Anak', 'Talisay', 'Tamayo'],
    'Calatagan': ['Baha', 'Balibago', 'Balitoc', 'Barangay 1 (Poblacion)', 'Barangay 2 (Poblacion)', 'Barangay 3 (Poblacion)', 'Barangay 4 (Poblacion)', 'Biga', 'Carlosa', 'Encarnacion', 'Gulod', 'Hukay', 'Lucsuhin', 'Luya', 'Putingbuhangin', 'Quilitisan', 'Real', 'Sambungan', 'Santa Ana', 'Talibayog', 'Talisay', 'Tanagan'],
    'Cuenca': ['Balagbag', 'Barangay I (Poblacion)', 'Barangay II (Poblacion)', 'Barangay III (Poblacion)', 'Barangay IV (Poblacion)', 'Bungahan', 'Calumayin', 'Dalipit', 'Dita', 'Don Juan', 'Emmanuel', 'Ibabao', 'Labac', 'Pinagkaisahan', 'San Felipe', 'San Isidro'],
    'Ibaan': ['Bago', 'Balanga', 'Bungahan', 'Calamias', 'Catandala', 'Coliat', 'Dayapan', 'Lapu-lapu', 'Lucsuhin', 'Mabalor', 'Malainin', 'Matala', 'Munting-Tubig', 'Palindan', 'Panghayaan', 'Pangilan', 'Poblacion', 'Quilo', 'Sabang', 'Salaban I', 'Salaban II', 'San Agustin', 'Sandalan', 'Talaibon', 'Tulay na Patpat'],
    'Laurel': ['As-Is', 'Balakilong', 'Berinayan', 'Bugaan East', 'Bugaan West', 'Buso-Buso', 'Catandaan', 'Dayap Itaas', 'Gulod', 'J. Leviste', 'J.P. Laurel', 'Molinete', 'Niyugan', 'Paliparan', 'San Gabriel', 'San Gregorio', 'San Miguel', 'Santa Maria', 'Santol'],
    'Lian': ['Bagong Tubig', 'Balibago', 'Binubusan', 'Bungahan', 'Cumba', 'Humayingan', 'Kapito', 'Kayquit', 'Lumaniag', 'Luyahan', 'Malaruhatan', 'Matabungkay', 'Poblacion', 'Prenza', 'Putican', 'Quitang', 'San Diego', 'Simlong'],
    'Lobo': ['Apar', 'Bagacay', 'Balibago', 'Banalo', 'Biga', 'Bignay I', 'Bignay II', 'Fabrica', 'Jaybanga', 'Lagadlarin', 'Mabilog na Bundok', 'Malabrigo', 'Masaguitsit', 'Nagtoctoc', 'Nagtaluntong', 'Olo-olo', 'Papaya', 'Pinaghawanan', 'Poblacion', 'Sawang', 'Soloc', 'Tayuman'],
    'Mabini': ['Anilao Proper', 'Anilao East', 'Bagalangit', 'Bulacan', 'Calamias', 'Camboya', 'Dalig', 'Gasang', 'Laurel', 'Ligaya', 'Malimatoc I', 'Malimatoc II', 'Mainaga', 'Mainit', 'Majuben', 'Matabungkay', 'Poblacion', 'Pulang Lupa', 'Pulong Anahao', 'Pulong Balibaguhan', 'Pulong Niogan', 'San Francisco', 'San Jose', 'San Juan', 'Santa Ana', 'Santa Mesa', 'Santo Niño', 'Santo Tomas', 'Talaga East', 'Talaga Proper'],
    'Malvar': ['Bagong Pook', 'Bilaran', 'Bulihan', 'Luta del Norte', 'Luta del Sur', 'Poblacion', 'San Andres', 'San Fernando', 'San Gregorio', 'San Juan', 'San Pedro I', 'San Pedro II', 'San Pioquinto', 'Santiago'],
    'Mataasnakahoy': ['Barangay I (Poblacion)', 'Barangay II (Poblacion)', 'Barangay III (Poblacion)', 'Barangay IV (Poblacion)', 'Bayorbor', 'Bubuyan', 'Calingatan', 'Ibo', 'Kinalaglagan', 'Loob', 'Lumang Lipa', 'Manggahan', 'Nangkaan', 'San Sebastian', 'Santol'],
    'Nasugbu': ['Aga', 'Balaytigui', 'Banilad', 'Barangay 1 (Poblacion)', 'Barangay 2 (Poblacion)', 'Barangay 3 (Poblacion)', 'Barangay 4 (Poblacion)', 'Barangay 5 (Poblacion)', 'Barangay 6 (Poblacion)', 'Barangay 7 (Poblacion)', 'Barangay 8 (Poblacion)', 'Barangay 9 (Poblacion)', 'Barangay 10 (Poblacion)', 'Barangay 11 (Poblacion)', 'Barangay 12 (Poblacion)', 'Bilaran', 'Bucana', 'Bulihan', 'Bunducan', 'Butucan', 'Calayo', 'Catandaan', 'Cogunan', 'Dayap', 'Kaylaway', 'Kayrilaw', 'Latag', 'Looc', 'Lumbangan', 'Malapad na Parang', 'Mataas na Pulo', 'Maugat', 'Munting Indan', 'Natipuan', 'Pantalan', 'Papaya', 'Putat', 'Reparo', 'Talangan', 'Tumalim', 'Utod', 'Wawa'],
    'Padre Garcia': ['Banaba', 'Bawi', 'Bilibinwang', 'Bula', 'Abulugan (Cabilang Baybay)', 'Castillo', 'Cawongan', 'Manggas', 'Maugat', 'Pansol', 'Poblacion East', 'Poblacion West', 'Quilo-quilo', 'Saguingan', 'San Felipe', 'San Miguel', 'Tamak', 'Tangob'],
    'Rosario': ['Alupay', 'Bagong Pook', 'Balibago', 'Bayawang', 'Bulacnin', 'Calantas', 'Lumbangan', 'Lutong Bahay', 'Malaya', 'Marilag', 'Namunga', 'Nasi', 'Navotas', 'Palangue 1', 'Palangue 2', 'Panghayaan', 'Poblacion', 'Pulong Buli', 'Pulong Saging', 'Quilib', 'San Carlos', 'San Ignacio', 'San Isidro East', 'San Isidro West', 'San Jose', 'San Juan', 'San Roque', 'Tiquiwan'],
    'San Jose': ['Adia', 'Aguila', 'Bagong Pook', 'Balagtasin', 'Banay-banay', 'Barangay I (Poblacion)', 'Barangay II (Poblacion)', 'Barangay III (Poblacion)', 'Barangay IV (Poblacion)', 'Bigain I', 'Bigain II', 'Bigain Norte', 'Bigain Sur', 'Buli', 'Calansayan', 'Dagatan', 'Don Luis', 'Galamay-Amo', 'Lalayat', 'Lapolapo I', 'Lapolapo II', 'Lepute', 'Lumbangan', 'Mabunga', 'Macandag', 'Malaking Pook', 'Matamis na Tubig', 'Minase I', 'Minase II', 'Natunuan', 'Palanca', 'Pinagsabangan I', 'Pinagsabangan II', 'Sabang I', 'Sabang II', 'San Isidro', 'San Roque', 'Santa Cruz', 'Santo Cristo', 'Santol', 'Sico I', 'Sico II', 'Taysan', 'Tugtug'],
    'San Juan': ['Abung', 'Balagbag', 'Barualte', 'Bataan', 'Bulihan', 'Calicanto', 'Calitcalit', 'Calubcub I', 'Calubcub II', 'Catandaan', 'Coloconto', 'Escribano', 'Hugom', 'Ibabang Talipanusin', 'Ilaya', 'Ilayang Calubcub', 'Ilayang Talipanusin', 'Janaojanao', 'Laiya-Aplaya', 'Laiya-Ibabang Taykin', 'Laiya Proper', 'Libato', 'Lipahan', 'Mabalanoy', 'Mabuhay', 'Maraykit', 'Muzon', 'Nagsaulay', 'Nagtoctoc', 'Palahanan I', 'Palahanan II', 'Palahanan Ilaya', 'Pinagbayanan', 'Poblacion', 'Poctol', 'Pulangbato', 'Puting Buhangin', 'Quipot', 'Sampiro', 'San Isidro', 'Sapangan', 'Subukin', 'Talahiban I', 'Talahiban II', 'Ticalan'],
    'San Luis': ['Barangay Zone I (Poblacion)', 'Barangay Zone II (Poblacion)', 'Barangay Zone III (Poblacion)', 'Barangay Zone IV (Poblacion)', 'Balagtasin', 'Balite', 'Bonliw', 'Calumpang East', 'Calumpang West', 'Durungao', 'Locloc', 'Luya', 'Manggahan', 'Muzon', 'San Anton', 'San Isidro', 'Santa Monica', 'Taliba', 'Tejero', 'Tigbi'],
    'San Nicolas': ['Abelo', 'Alas-as', 'Barangay I (Poblacion)', 'Barangay II (Poblacion)', 'Barangay III (Poblacion)', 'Barangay IV (Poblacion)', 'Bolbok', 'Calangay', 'Calumpit', 'Helera', 'Lagaring', 'Maabud Norte', 'Maabud Sur', 'Macolod', 'Maigsing Dahilig', 'Munlawin', 'Pansipit', 'Pulang Bato', 'Salong', 'San Andres', 'Santiago', 'Sinturisan', 'Sok-Ong', 'Talang', 'Tilapia'],
    'San Pascual': ['Alalum', 'Antipolo', 'Balimbing', 'Banaba', 'Bayanan', 'Danglayan', 'Del Pilar', 'Kaingin', 'Laurel', 'Lemery', 'Malaking Pook', 'Maria Paz', 'Mataas na Lupa', 'Natunuan Norte', 'Natunuan Sur', 'Palsahingin', 'Pila', 'Poblacion East', 'Poblacion South', 'Poblacion West', 'Resplandor', 'Sambat', 'San Antonio', 'San Mariano', 'San Mateo', 'Santa Elena', 'Santo Niño'],
    'Santa Teresita': ['Bihis', 'Burol', 'Calumpang', 'Calangay', 'Ilayang Butnong', 'Ilayang Palsara', 'Ilayang Poblacion', 'Ilayang San Roque', 'Ilayang Sico', 'Ilayang Tubuan', 'Ilayang Bubukal', 'Pacifico', 'Pagalanggang', 'San Isidro Norte', 'San Isidro Sur', 'Sinipian', 'Tambo Ibaba', 'Tambo Ilaya'],
    'Santo Tomas': ['Barangay I (Poblacion)', 'Barangay II (Poblacion)', 'Barangay III (Poblacion)', 'Barangay IV (Poblacion)', 'San Agustin', 'San Antonio', 'San Bartolome', 'San Felix', 'San Fernando', 'San Francisco', 'San Isidro North', 'San Isidro South', 'San Jose', 'San Juan', 'San Luis', 'San Miguel', 'San Pablo', 'San Pedro', 'San Rafael', 'San Roque', 'San Vicente', 'Santa Ana', 'Santa Clara', 'Santa Cruz', 'Santa Elena', 'Santa Maria', 'Santa Teresita', 'Santiago'],
    'Taal': ['Apacay', 'Balisong', 'Bihis', 'Buli', 'Butong', 'Cawit', 'Conforme', 'Cuyos-Malaki', 'Cuyos-Munti', 'Gahol', 'Halang', 'Ilog', 'Leperous', 'Luntal', 'Maria Rosario', 'Mahabang Lodlod', 'Pansol', 'Poblacion Barangay 1', 'Poblacion Barangay 10', 'Poblacion Barangay 11', 'Poblacion Barangay 12', 'Poblacion Barangay 2', 'Poblacion Barangay 3', 'Poblacion Barangay 4', 'Poblacion Barangay 5', 'Poblacion Barangay 6', 'Poblacion Barangay 7', 'Poblacion Barangay 8', 'Poblacion Barangay 9', 'Quiling', 'Sampaloc', 'San Guillermo', 'Santa Cecilia', 'Santa Cruz', 'Sulpoc', 'Talisay', 'Tierra Alta', 'Tranca', 'Tres Cruses'],
    'Talisay': ['Aya', 'Banga', 'Balas', 'Buco', 'Caloocan', 'Leynes', 'Miranda', 'Poblacion East', 'Poblacion West', 'Quiling', 'San Guillermo', 'Sampaloc', 'Santa Cruz', 'Tranca', 'Tumaway'],
    'Taysan': ['Bacao', 'Bilogo', 'Bukal', 'Dagatan', 'Guinhawa', 'Laurel', 'Mataas na Lupa', 'Matingain', 'Panghayaan', 'Pinagbayanan', 'Piña', 'Pook ni Banal', 'San Isidro', 'San Jose', 'San Marcelino', 'Santo Niño', 'Tilambo'],
    'Tingloy': ['Gamao', 'Mahabang Buhangin', 'Papaya', 'Poblacion', 'Pulo', 'San Isidro', 'San Jose', 'San Juan', 'Santa Ana'],
    'Tuy': ['Acle', 'Bayudbud', 'Bolbok', 'Dalima', 'Dao', 'Guinhawa', 'Luntal', 'Magahis', 'Malibu', 'Mataywanac', 'Putol', 'Rillo', 'Sabang', 'San Jose', 'San Nicolas', 'Toong', 'Tuyon-Tuyon']
};

// Updated municipality coordinates - more accurate center points
const municipalityCoordinates = {
    'Batangas City': [13.7565, 121.0583],
    'Lipa City': [13.9411, 121.1633],
    'Tanauan City': [14.0583, 121.1522],
    'Lemery': [13.9167, 120.8833],      // Updated - more accurate, west of San Luis
    'Nasugbu': [13.5667, 120.6167],
    'Santo Tomas': [13.9333, 121.0167],
    'Agoncillo': [13.9333, 120.9333],
    'Alitagtag': [13.8667, 121.0000],
    'Balayan': [13.9333, 120.7333],
    'Balete': [13.8333, 121.0167],
    'Bauan': [13.7917, 121.0083],
    'Calaca': [13.9167, 120.8167],
    'Calatagan': [13.8333, 120.6333],
    'Cuenca': [13.9000, 121.0500],
    'Ibaan': [13.8167, 121.1333],
    'Laurel': [14.0500, 120.9000],
    'Lian': [13.9833, 120.6500],
    'Lobo': [13.6500, 121.2333],
    'Mabini': [13.7167, 120.9000],
    'Malvar': [14.0333, 121.1500],
    'Mataasnakahoy': [13.9667, 121.1000],
    'Padre Garcia': [13.8833, 121.2167],
    'Rosario': [13.8500, 121.2000],
    'San Jose': [13.8833, 121.0833],
    'San Juan': [13.8333, 121.4000],
    'San Luis': [13.7833, 120.9500],    // Verified - east of Lemery
    'San Nicolas': [13.9167, 121.0667],
    'San Pascual': [13.8000, 121.0333],
    'Santa Teresita': [13.8667, 120.9667],
    'Taal': [13.8833, 120.9333],
    'Talisay': [14.1000, 120.9333],
    'Taysan': [13.7667, 121.2167],
    'Tingloy': [13.6667, 120.8667],
    'Tuy': [13.9833, 120.7333]
};
