<?php

namespace App\Services;

class ApiService {

    const API_URL = 'https://9sf7x3qadg.execute-api.eu-west-1.amazonaws.com/api';

    private $client;

    public function __construct($client = null)
    {
        $this->client = $client ? $client : new \GuzzleHttp\Client();
    }

    public function employees()
    {
        $response = $this->client->request('GET', self::API_URL . '/employee');

        $data = json_decode($response->getBody(), true);
        $filtered = array_filter($data, function($employee){
            return !array_key_exists('type', $employee);
        });

        return array_values($filtered);
    }

    public function create($data)
    {

        $response = $this->client->request('POST', self::API_URL . '/employee', [
            'body' => json_encode($data),
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ]
        ]);

        return json_decode($response->getBody(), true);
    }

    public function delete($id)
    {
        $response = $this->client->request('DELETE', self::API_URL . '/employee' . '/' . $id);

        return json_decode($response->getBody(), true);
    }

}
