<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic test example.
     */
    public function test_login_page_returns_a_successful_response(): void
    {
        $this->withoutVite();

        $response = $this->get('/');

        $response
            ->assertStatus(200)
            ->assertSee('Laba101')
            ->assertSee('Sign in')
            ->assertSee('admin@laba101.test');
    }

    public function test_authenticated_user_can_view_dashboard(): void
    {
        $this->withoutVite();

        $user = User::factory()->create([
            'role' => 'admin',
        ]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response
            ->assertStatus(200)
            ->assertSee('Revenue overview')
            ->assertSee('Recent activities')
            ->assertDontSee('New order');
    }

    public function test_authenticated_user_can_view_pos_orders(): void
    {
        $this->withoutVite();

        $user = User::factory()->create([
            'role' => 'admin',
        ]);

        $response = $this->actingAs($user)->get('/pos-orders');

        $response
            ->assertStatus(200)
            ->assertSee('New order')
            ->assertSee('Order queue');
    }

    public function test_authenticated_user_can_view_new_modules(): void
    {
        $this->withoutVite();

        $user = User::factory()->create([
            'role' => 'admin',
        ]);

        foreach ([
            '/pricing-services' => 'Pricing Services',
            '/disbursements' => 'Disbursements',
            '/reports' => 'Report Center',
            '/settings' => 'Settings',
        ] as $uri => $text) {
            $this->actingAs($user)
                ->get($uri)
                ->assertStatus(200)
                ->assertSee($text);
        }
    }

    public function test_staff_only_sees_staff_allowed_modules(): void
    {
        $this->withoutVite();

        $user = User::factory()->create([
            'role' => 'staff',
        ]);

        $response = $this->actingAs($user)->get('/disbursements');

        $response
            ->assertStatus(200)
            ->assertSee('Disbursement')
            ->assertSee('Reports')
            ->assertSee('Inventory')
            ->assertDontSee('Dashboard')
            ->assertDontSee('POS / Orders')
            ->assertDontSee('Pricing Services')
            ->assertDontSee('Settings');
    }

    public function test_staff_is_redirected_away_from_admin_modules(): void
    {
        $user = User::factory()->create([
            'role' => 'staff',
        ]);

        foreach (['/dashboard', '/pos-orders', '/pricing-services', '/settings'] as $uri) {
            $this->actingAs($user)
                ->get($uri)
                ->assertRedirect(route('disbursements.index'));
        }
    }
}
