import runDBQuery as runQuery

def getAll_pharmacy():
    query_1 = """select * from pharmacy;"""
    ##print(query_1)
    reading_records = runQuery.queryDB(query_1)
    return reading_records


#select pharmacy for the patients
def select_pharmacy(data):
    select_query = """select pha.pharm_name,pha.pharm_adr,pha.pharm_num,pha.pharm_fax from patient as u 
    inner join user_pharmacy as u_pharm on u_pharm.fk_user_pharmacy_user= u.email 
    inner join pharmacy as pha on pha.pharmid = u_pharm.fk_user_pharmacy_pharmID 
    where u.email = \'"""+data['email']+"""\';"""
    print(select_query)

    reading_records = runQuery.queryDB(select_query)
    return reading_records

#add the pharmacy for the patients
def insert_pharmacy(data):
    insert_query = """INSERT INTO user_pharmacy values("""+data['id']+""" , \'"""+data['p_email']+"""\');"""
    #print(insert_query)
    records = runQuery.updateDB(insert_query)
    print(records)
    return records
## update exisiting pharmacy for patient

