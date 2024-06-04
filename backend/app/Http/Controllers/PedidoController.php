<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\PedidoProduto;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function index()
    {
        return Pedido::all();
    }

    public function store(Request $request)
    {
        $pedido = Pedido::create($request->all());
        foreach ($request->produtos as $produto) {
            PedidoProduto::create([
                'pedido_id' => $pedido->id,
                'produto_id' => $produto['id'],
                'quantidade' => $produto['quantidade'],
            ]);
        }
        return response()->json($pedido, 201);
    }

    public function show($id)
    {
        return Pedido::with('produtos')->find($id);
    }

    public function update(Request $request, $id)
    {
        $pedido = Pedido::findOrFail($id);
        $pedido->update($request->all());
        return response()->json($pedido, 200);
    }

    public function destroy($id)
    {
        Pedido::destroy($id);
        return response()->json(null, 204);
    }
}

