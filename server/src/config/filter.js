module.exports = {

  service: ['service_id', 'service_name', 'contact_number', 'owner_id',
    'rating', 'address', 'price_per_hour'],

  reservation: ['reserve_id', 'service_id', 'customer_id', 'employee_id', 'start_time',
    'end_time', 'date', 'is_cancel', 'paid_status', 'price'],

  user: ['user_id', 'email', 'first_name', 'last_name', 'gender', 'user_type',
    'address', 'contact', 'payment_accounts'],

  payment: ['number', 'method', 'company']

}
